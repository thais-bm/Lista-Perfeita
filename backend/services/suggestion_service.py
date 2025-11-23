import json
import aiofiles # Biblioteca para I/O de arquivos assíncrono
from pathlib import Path
from LLM.runner import sugerir_async

# Caminho para o arquivo que sua LLM gera
LINKS_FILE = Path(__file__).resolve().parent.parent / "LLM" / "json_files" / "links.json"

async def gerar_sugestao_presente(perfil: dict):
    # Formatar os dados do perfil em uma string para o prompt da IA
    conteudo = (
        f'{{ "idade": {perfil.get("idade")}, '
        f'"genero": "{perfil.get("genero")}", '
        f'"gosta": {json.dumps(perfil.get("interesses", []))}, '
        f'"ocasião": "{perfil.get("ocasiao")}", '
        f'"faixa_preco": "{perfil.get("min_preco")} a {perfil.get("max_preco")}" }}'
    )

    # 2. Chamar o runner da IA
    await sugerir_async(conteudo)

    # 3. Ler o arquivo JSON gerado pela ferramenta
    if LINKS_FILE.exists():
        async with aiofiles.open(LINKS_FILE, mode="r", encoding="utf-8") as f:
            content = await f.read() # Leitura não bloqueante
            resultado = json.loads(content) # Parse do JSON em memória
        return resultado
    else:
        return {"error": "Nenhuma sugestão foi gerada."}