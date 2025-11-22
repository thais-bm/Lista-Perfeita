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

    # pegar id do usuário logado a partir do token
    id_usuariologado = get_organizador_id(request)
    is_owner = (id_usuariologado == lista["id_organizador"])

    # Verificar se a lista é privada
    if lista["privacidade_lista"] != "shared" and not is_owner:
        raise HTTPException(status_code=403, detail="Lista é privada")
    
    # Extrair nome do organizador e adicionar na lista
    organizador = Organizador.get_by_id(lista["id_organizador"])
    nome_organizador = organizador.name if organizador else "Desconhecido"
    lista["organizador"] = nome_organizador

    return {"lista": lista}

@router.patch("/marcar/{list_id}/{produto_id}")
async def marcar_comprado(list_id: str, produto_id: int, body: dict):
    nome = body.get("comprado_por", "").strip()

    lista = lista_presente.get_lista_by_id(list_id)
    if not lista:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    for presente in lista["presentes"]:
        if presente["id"] == produto_id:
            if presente["status"] != "disponível":
                raise HTTPException(status_code=403, detail="Presente já comprado")

            presente["status"] = "comprado"
            presente["comprado_por"] = nome

            lista_presente.atualizar_presentes(list_id, lista)

            return {"status": "ok"}

    raise HTTPException(status_code=404, detail="Presente não encontrado")

@router.patch("/desmarcar/{list_id}/{produto_id}")
async def desmarcar_comprado(list_id: str, produto_id: int):
    lista = lista_presente.get_lista_by_id(list_id)

    if not lista:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    for presente in lista["presentes"]:
        if presente["id"] == produto_id:
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
  
"""
@router.put("/updateLista/{list_id}")
async def atualizar_lista_presente(list_id: str, lista_data: Request):
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, atualizar a lista com os novos dados
    # Retornar a lista atualizada ou uma mensagem de erro
@router.put("/updateList/{list_id}")
async def atualizar_lista_presente(list_id: str, request: Request):

    # 1. Verificar usuário autenticado
    id_organizador = get_organizador_id(request)

    # 2. Obter dados enviados pelo React
    data = await request.json()

    # 3. Buscar a lista original
    lista_original = lista_presente.get_lista_by_id(list_id)
    if not lista_original:
        raise HTTPException(status_code=404, detail="Lista não encontrada")

    # 4. Verificar se pertence ao organizador
    if lista_original["id_organizador"] != id_organizador:
        raise HTTPException(status_code=403, detail="Você não tem permissão para editar esta lista")

    # 5. Atualizar dados permitidos
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
async def adicionar_item_lista(list_id: str, item_data: Request):
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, adicionar o item à lista
    # Retornar a lista atualizada ou uma mensagem de erro

@router.delete("/removeItem/{list_id}/{item_id}")
async def remover_item_lista(list_id: str, item_id: str, request: Request):
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, remover o item da lista
    # Retornar a lista atualizada ou uma mensagem de erro

@router.get("/getItems/{list_id}")
async def obter_itens_lista(list_id: str, request: Request):
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, buscar todos os itens da lista
    # Retornar os itens encontrados ou uma mensagem de erro

@router.post("/markItem/{list_id}/{item_id}")
async def marcar_item_comprado(list_id: str, item_id: str, request: Request):
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, marcar o item como comprado
    # Retornar a lista atualizada ou uma mensagem de erro

@router.post("/unmarkItem/{list_id}/{item_id}")
async def desmarcar_item_comprado(list_id: str, item_id: str, request: Request):

     # Primeiro, identificar quem é o usuario chamando esse endpoint
     # Depois, verificar se a lista pertence a esse usuario
     # Se pertencer, desmarcar o item como comprado
     # Retornar a lista atualizada ou uma mensagem de erro

@router.get("/shareList/{list_id}")
async def compartilhar_lista(list_id: str, request: Request):
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, gerar um link compartilhável para a lista
    # Opcao de disparar mensagem para os convidados via numero de telefone (whatsapp) ou email
    # Retornar o link ou uma mensagem de erro

"""
