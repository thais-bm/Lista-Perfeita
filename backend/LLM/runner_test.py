from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent
from runner import sugerir

sugerir('{ "idade": 17, "gosta": [ "video games", "comida", "gatos", "meias", "ciencia" ], "não gosta": [ "altura", "sapatos" ], "relação com o presenteador": "familia", "ocasião": "amigo oculto", }')