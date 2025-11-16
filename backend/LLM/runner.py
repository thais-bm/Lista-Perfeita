from agent import root_agent
from tools import StopFlag
from google.adk import Runner
from google.adk.sessions import InMemorySessionService
from google.genai.types import Content, Part
import asyncio

async def sugerir_async(conteudo):
    try:
        session = InMemorySessionService()
        await session.create_session(app_name="agents", user_id="sugestor", session_id="ola")
        runner = Runner(agent=root_agent, session_service=session, app_name="agents")
        run = runner.run_async(user_id="sugestor", session_id="ola", new_message=Content(parts=[Part(text=conteudo)]))
        async for event in run:
            """for element in event:
                print(element)"""
            pass
    except StopFlag:
        print("deu tudo certo e o processo foi finalizado com a captura de uma exceção lançada de propósito no fim da busca agora olha pra backend/LLM/json_files./links.json la que ta o resultado disso tudo")
        pass

def sugerir(conteudo):
    asyncio.run(sugerir_async(conteudo=conteudo))
