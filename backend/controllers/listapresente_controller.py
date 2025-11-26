# backend/controllers/organizador_controller.py
import uuid
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr

import dotenv
import os
from jose import jwt

from models.lista_presente import lista_presente
from models.organizador_evento import organizador_evento as Organizador # so pra pegar a funcao de pegar o nome do organizador 
from models.produto import Produto
from models.lista_presente import ItemMarkData
from services.zoom_scraper import buscar_zoom_async
    
# Carregar variáveis de ambiente
dotenv.load_dotenv()

# Define o roteador para as rotas de usuário
router = APIRouter(prefix="/giftlist", tags=["giftlist"])

# Funcao auxiliar que extrai o ID do organizador do token JWT
# Token JWT possui: ID do organizador e email
def get_organizador_id(request: Request):
    token = request.headers.get("token")
    if not token:
        raise HTTPException(status_code=401, detail="Token ausente")

    token = token.replace("Bearer ", "")
    secret = os.getenv("SECRET_KEY")

    try:
        payload = jwt.decode(token, secret, algorithms=["HS256"])
        return payload["id"]
    except Exception as e:
        raise HTTPException(status_code=401, detail="Token inválido")

# Rotas da lista de presentes
@router.post("/createList")
async def criar_nova_lista(request: Request):
    data = await request.json()

    # 1. Identificar organizador via token
    id_organizador = get_organizador_id(request)

    # 2. Criar a lista
    lista = lista_presente(
        id_lista_presente=str(uuid.uuid4()),
        nome_lista=data.get("nome_lista"),
        descricao_lista=data.get("descricao_lista"),
        ocasiao=data.get("ocasiao"),
        data_evento=data.get("data_evento"),
        id_organizador=id_organizador,
        privacidade_lista=data.get("privacidade_lista")
    )

    # 3. Salvar no banco (JSON)
    lista_presente.salvar_lista(lista.to_dict())

    return {
        "message": "Lista criada com sucesso",
        "lista": lista.to_dict()
    }


@router.get("/getLists")
async def obter_listas_presentes(request: Request):
    # Primeiro, identificar quem é o usuario chamando esse endpoint

    # Depois, buscar todas as listas associadas a esse usuario
    # Retornar as listas encontradas
    id_organizador = get_organizador_id(request)
    
    listas = lista_presente.get_listas_by_organizador(id_organizador)
    
    for lista in listas:
        if "presentes" not in lista:
            lista["presentes"] = []
    return {
        "listas": listas
        }
    

@router.delete("/deleteList/{list_id}")
async def deletar_lista_presente(list_id: str, request: Request):
    
    id_organizador = get_organizador_id(request)
    listas_usuario = lista_presente.get_listas_by_organizador(id_organizador)

    lista_encontrada = next((l for l in listas_usuario if l["id_lista_presente"] == list_id), None)

    if not lista_encontrada:
        raise HTTPException(
            status_code=404,
            detail="Lista não encontrada ou não pertence ao usuário."
        )

    sucesso = lista_presente.deletar_lista(list_id)

    if not sucesso:
        raise HTTPException(status_code=500, detail="Erro ao deletar lista.")

    return {"status": "ok", "message": "Lista deletada com sucesso.", "id": list_id}


@router.get("/getList/{list_id}")
async def obter_lista_por_id(list_id: str, request: Request):
    lista = lista_presente.get_lista_by_id(list_id)

    if not lista:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    # Tenta pegar o usuário, mas aceita se for None (visitante)
    try:
        id_usuariologado = get_organizador_id(request)
    except HTTPException:
        id_usuariologado = None

    # Verifica se é dono
    is_owner = (id_usuariologado == lista["id_organizador"]) if id_usuariologado else False

    # Lógica de acesso:
    # Se NÃO for compartilhada E (não tiver usuário OU usuário não for dono) -> Bloqueia
    if lista["privacidade_lista"] != "shared" and not is_owner:
        raise HTTPException(status_code=403, detail="Lista é privada")
    
    # Extrair nome do organizador e adicionar na lista
    organizador = Organizador.get_by_id(lista["id_organizador"])
    nome_organizador = organizador.name if organizador else "Desconhecido"
    lista["organizador"] = nome_organizador

    return {"lista": lista}

@router.patch("/marcar/{list_id}/{produto_id}")
async def marcar_comprado(list_id: str, produto_id: str, body: dict): # Alterado produto_id para str
    nome = body.get("comprado_por", "").strip()

    lista = lista_presente.get_lista_by_id(list_id)
    if not lista:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    for presente in lista["presentes"]:
        # Converte ambos para string para garantir a comparação (seja int ou uuid)
        if str(presente["id"]) == str(produto_id):
            if presente["status"] not in ["disponível", "disponivel"]:
                # Opcional: permitir sobrescrever se for o mesmo comprador, mas por segurança bloqueamos
                raise HTTPException(status_code=403, detail="Presente já comprado")

            presente["status"] = "comprado"
            presente["comprado_por"] = nome

            lista_presente.atualizar_presentes(list_id, lista)

            return {"status": "ok"}

    raise HTTPException(status_code=404, detail="Presente não encontrado")

@router.patch("/desmarcar/{list_id}/{produto_id}")
async def desmarcar_comprado(list_id: str, produto_id: str): # Alterado produto_id para str
    lista = lista_presente.get_lista_by_id(list_id)

    if not lista:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    for presente in lista["presentes"]:
        # Converte ambos para string para garantir a comparação
        if str(presente["id"]) == str(produto_id):
            presente["status"] = "disponível"
            presente["comprado_por"] = ""

            lista_presente.atualizar_presentes(list_id, lista)

            return {"status": "ok"}

    raise HTTPException(status_code=404, detail="Presente não encontrado")

class BuscaRequest(BaseModel):
    termo: str

@router.post("/search")
async def search_products(body: BuscaRequest):
    termo = body.termo.strip()

    # executa scraper (retorna lista de dicts)
    resultados_raw = await buscar_zoom_async(termo)

    # converte dict → Produto
    produtos = [
        Produto.from_scraped(item).to_dict()
        for item in resultados_raw
    ]

    return produtos


@router.put("/updateList/{list_id}")
async def atualizar_lista_presente(list_id: str, request: Request):

    id_organizador = get_organizador_id(request)

    data = await request.json()

    lista_original = lista_presente.get_lista_by_id(list_id)
    if not lista_original:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    if lista_original["id_organizador"] != id_organizador:
        raise HTTPException(status_code=403, detail="Você não tem permissão para editar esta lista")

    novos_dados = {
        "nome_lista": data.get("nome_lista", lista_original["nome_lista"]),
        "descricao_lista": data.get("descricao_lista", lista_original["descricao_lista"]),
        "ocasiao": data.get("ocasiao", lista_original["ocasiao"]),
        "data_evento": data.get("data_evento", lista_original["data_evento"]),
        "privacidade_lista": data.get("privacidade_lista", lista_original["privacidade_lista"]),
    }

    lista_atualizada = lista_presente.atualizar_lista(list_id, novos_dados)

    return {
        "message": "Lista atualizada com sucesso",
        "lista": lista_atualizada
    }

@router.post("/addItem/{list_id}")
async def adicionar_item_lista(list_id: str, request: Request):

    id_organizador = get_organizador_id(request)
    data = await request.json()

    lista = lista_presente.get_lista_by_id(list_id)
    if not lista:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    if lista["id_organizador"] != id_organizador:
        raise HTTPException(status_code=403, detail="Você não pode editar esta lista")

    novo_item = {
        "id": str(uuid.uuid4()),
        "nome": data["nome"],
        "descricao": data.get("descricao", ""),
        "preco": data.get("preco", 0),
        "imagem": data.get("imagem", ""),
        "link": data.get("links", []),
        "status": "disponivel"
    }

    lista_atualizada = lista_presente.adicionar_item(list_id, novo_item)

    return {
        "message": "Item adicionado",
        "lista": lista_atualizada
    }

@router.delete("/removeItem/{list_id}/{item_id}")
async def remover_item_lista(list_id: str, item_id: str, request: Request):

    id_organizador = get_organizador_id(request)

    lista = lista_presente.get_lista_by_id(list_id)
    if not lista:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    if lista["id_organizador"] != id_organizador:
        raise HTTPException(status_code=403, detail="Você não pode editar esta lista")

    lista_atualizada = lista_presente.remover_item(list_id, item_id)

    return {
        "message": "Item removido",
        "lista": lista_atualizada
    }

@router.get("/getItems/{list_id}")
async def obter_itens_lista(list_id: str, request: Request):

    id_organizador = get_organizador_id(request)

    lista = lista_presente.get_lista_by_id(list_id)
    if not lista:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    if lista["id_organizador"] != id_organizador:
        raise HTTPException(status_code=403, detail="Você não pode ver os itens desta lista")

    return {
        "items": lista.get("presentes", [])
    }

@router.post("/markItem/{list_id}/{item_id}")
async def marcar_item_comprado(list_id: str, item_id: str,mark_data: ItemMarkData, request: Request):
    """Marca um item como 'comprado' se for o organizador da lista."""
    id_organizador = get_organizador_id(request)

    lista = lista_presente.get_lista_by_id(list_id)
    if not lista:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    if lista["id_organizador"] != id_organizador:
        raise HTTPException(status_code=403, detail="Você não tem permissão para editar esta lista")

    # Procurar e marcar o item
    presentes = lista.get("presentes", [])
    item_encontrado = next((p for p in presentes if str(p.get("id")) == item_id), None)

    if not item_encontrado:
        raise HTTPException(status_code=404, detail="Presente não encontrado")
    
    if item_encontrado["status"] != "disponivel":
        raise HTTPException(status_code=403, detail="Presente já está marcado")


    item_encontrado["status"] = "comprado"
    item_encontrado["comprado_por"] = mark_data.comprado_por 

    lista_presente.atualizar_presentes(list_id, lista)

    return {
        "message": "Item marcado como comprado",
        "lista": lista
    }

@router.post("/unmarkItem/{list_id}/{item_id}")
async def desmarcar_item_comprado(list_id: str, item_id: str, request: Request):
    """Desmarca um item como 'disponível' se for o organizador da lista."""
    id_organizador = get_organizador_id(request)

    lista = lista_presente.get_lista_by_id(list_id)
    if not lista:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    if lista["id_organizador"] != id_organizador:
        raise HTTPException(status_code=403, detail="Você não tem permissão para editar esta lista")

    # Procurar e desmarcar o item
    presentes = lista.get("presentes", [])
    item_encontrado = next((p for p in presentes if str(p.get("id")) == item_id), None)

    if not item_encontrado:
        raise HTTPException(status_code=404, detail="Presente não encontrado")
    
    if item_encontrado["status"] != "comprado":
         raise HTTPException(status_code=403, detail="Presente já está desmarcado")


    item_encontrado["status"] = "disponivel"
    item_encontrado["comprado_por"] = ""

    # Chamar a função de atualização no modelo
    lista_presente.atualizar_presentes(list_id, lista)

    return {
        "message": "Item desmarcado como disponível",
        "lista": lista
    }

# --- Rota de Compartilhamento ---

@router.get("/shareList/{list_id}")
async def compartilhar_lista(list_id: str, request: Request):
    """Gera o link de compartilhamento da lista."""
    id_organizador = get_organizador_id(request)
    
    lista = lista_presente.get_lista_by_id(list_id)
    if not lista:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    if lista["id_organizador"] != id_organizador:
        raise HTTPException(status_code=403, detail="Você não tem permissão para compartilhar esta lista")
        
    if lista["privacidade_lista"] == "private":
        raise HTTPException(status_code=403, detail="Lista privada não pode ser compartilhada")

    # 1. Gerar link (Assumindo que o frontend tem uma rota para listas compartilhadas)
    # Exemplo: http://seusite.com/listas/list_id
    base_url_frontend = os.getenv("FRONTEND_URL", "http://localhost:3000") # 💡 Use variável de ambiente
    share_link = f"{base_url_frontend}/listas/publica/{list_id}"
    
    # 2. (OPCIONAL) Salvar o link gerado no banco de dados se o campo url_lista existir
    # lista_presente.atualizar_lista(list_id, {"url_lista": share_link})
    
    # 3. Retornar
    return {
        "message": "Link de compartilhamento gerado com sucesso",
        "share_link": share_link,
        "lista_id": list_id
        # Não implementei envio por WhatsApp/Email aqui, pois requer serviços externos.
    }