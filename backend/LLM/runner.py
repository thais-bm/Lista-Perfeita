from agent import root_agent
from tools import StopFlag
from google.adk import Runner
from google.adk.sessions import InMemorySessionService
from google.genai.types import Content, Part
import asyncio

async def sugerir(conteudo):
    session = InMemorySessionService()
    await session.create_session(app_name="sugeridor", user_id="oi", session_id="ola")
    runner = Runner(agent=root_agent, session_service=session, app_name="sugeridor")
    run = runner.run_async(user_id="oi", session_id="ola", new_message=Content(parts=[Part(text=conteudo)]))
    async for event in run:
        for element in event:
            print(element)

asyncio.run(sugerir('{ "idade": 14, "gosta": [ "video games", "comida", "gatos", "meias", "ciencia" ], "não gosta": [ "altura", "sapatos" ], "relação com o presenteador": "amigo", "ocasião": "aniversário", }'))