from google.adk.tools.function_tool import FunctionTool
from google.adk.tools import ToolContext
from google.adk.agents.callback_context import CallbackContext
from google.adk.models import llm_request, llm_response
from google.adk.models.llm_request import LlmRequest
from google.adk.models.llm_response import LlmResponse
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

from zoom_scraper import buscar_zoom_async as buscar_zoom

def searchlist_add(reflection: str, items: dict[str, str]) -> dict:
    """
    Updates the list of items that will be searched automatically and have their results outputted to the website after you're finished working.
    This tool must ONLY be used for adding PRODUCT SUGGESTIONS to the list file. Using this tool with miscelaneous information instead of a specific purchase suggestion will likely produce unexpected results.
    
    Args:
        "reflection" (str):
            str object that holds a paragraph where you reflect on the data received about the person you're suggesting presents for.
            treat it like a sketch/brainstorm of what type of gift the person might enjoy the most, noting down every possibility.
            use your creativity, go all out, don't be afraid to think too much, and even try to come up with a few examples yourself during the reflection phase that you may call back to in the more formalized step that is the next argument.

        "items" (dict[str, str]):
            dict object that contains each individual search query.
            each element of "items" (str:str):
                The first value of the element (str) must be the name of the product itself, and it's what'll be put in the search query later.
                The second value of the element (str) must be a well thought-out reasoning behind your choice of product for the person receiving the gift.
                
    Example usage (HYPOTHETICAL SITUATION):
        below is an example of a hypothetical situation, of a child who's described to like animals, clothes, swimming, the color pink and is celebrating their birthday.
        like this: {"Briquedos para piscina": "julgando pela idade de criança, o aniversariante pode apreciar brinquedos, e tendo em consideração que essa pessoa gosta de nadar, brinquedos de piscina podem ser uma sugestão boa.": ,
                    "Pelúcia de gato rosa": "essa pessoa apresenta gostar mais das cores rosa e vermelho, e gosta de animais",
                    "Tênis com luzes": "tendo em mente que essa pessoa é muito jovem e as recomendações de presente incluem roupas, posso sugerir algo divertido como tênis com luzes piscantes."}
        Note that this is a purely hypothetical and illustrative example. Take into consideration the formatting shown for your own use of the tool, but do not take these example items as inspiration for your suggestions.
    """
    try:
        filepath = BASE_DIR / "json_files" / "searchlist.json"
        with filepath.open("r", encoding="utf-8") as file:
            searchlist = json.load(file)
        searchlist["searchitems"] = items
        with filepath.open("w", encoding="utf-8") as file:
            json.dump(searchlist, file, indent=2, ensure_ascii=False)
        return {"status":"success", "message":"Good job! The list was saved to the files and the web serch for those products will occour shortly. You must not use this tool again, since your job is finished and you've successfully accomplished your goal."}
    except Exception as e:
        return {"status":"failure", "message":"error occured during execution, list was not saved.", "cause":str(e)}

add_tool = FunctionTool(searchlist_add)

def stop() -> None:
    """
    tool that lets you end the session. no arguments.
    """
    return

stop_tool = FunctionTool(stop)

class StopFlag(Exception):
    pass

def stopcallback(tool, args, tool_context: CallbackContext):
    if tool.name == "stop":
        tool_context._event_actions.end_of_agent = True

    filepath = BASE_DIR / "json_files" / "debug.json"
    with filepath.open("w", encoding="utf-8") as file:
        file.write(tool_context._event_actions.model_dump_json(indent=2, ensure_ascii=False))
    filepath = BASE_DIR / "json_files" / "debug2.json"
    with filepath.open("w", encoding="utf-8") as file:
        file.write(tool_context.session.model_dump_json(indent=2, ensure_ascii=False))
    return

async def suggestion_search_callback(tool, args, tool_context: CallbackContext):
    if tool.name == "searchlist_add":
        resultlist = []
        
        for item in args["items"]:
            resultlist.append(
                {"search query": item,
                 "ai reasoning": args["items"][item],
                 "search results": await buscar_zoom(item)}
            )

        finaldict = {"brainstorm":args["reflection"],  "searches":resultlist}
        
        filepath = BASE_DIR / "json_files" / "links.json"
        with filepath.open("w", encoding="utf-8") as file:
            json.dump(finaldict, file, indent=2)

        filepath = BASE_DIR / "json_files" / "debug2.json"
        with filepath.open("w", encoding="utf-8") as file:
            file.write(tool_context.session.model_dump_json(indent=2, ensure_ascii=False))

        if tool_context.session.user_id == "sugestor":
            raise StopFlag("capturar essa excecao no runner programatico desse LLM")
        
        return {"status":"success", "message":"Good job! The list was saved to the files and the web serch for those products will occour shortly. You must not use this tool again, since your job is finished and you've successfully accomplished your goal."}
    return None


print(searchlist_add("oi oi", {"testando":"123"})["status"])