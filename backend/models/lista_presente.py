# backend/models/lista_presente.py

import pydantic
from typing import Optional, List, Dict
from datetime import date
from enum import Enum
import json, os, dotenv
from pathlib import Path

"""
Titulo da lista
Descricao
Ocasicao
Data do evento
Privacidade da lista pode ser 1- Publica ou 2- Privada
ID do organizador (quem criou a lista)


"""
dotenv.load_dotenv()
db_path_str = os.getenv("LIST_FILE")
if db_path_str is None:
    raise ValueError("A variável de ambiente 'LIST_FILE' não foi definida.")

DB_FILE = Path(db_path_str)

class PrivacidadeLista(str, Enum):
    COMPARTILHADA = "shared"
    PRIVADA = "private"

class lista_presente:
    def __init__(self, id_lista_presente=None, nome_lista=None, descricao_lista=None, ocasiao=None, data_evento=None, id_organizador=None, privacidade_lista=None):
        self.id_lista_presente = id_lista_presente
        self.nome_lista = nome_lista
        self.descricao_lista = descricao_lista
        self.ocasiao = ocasiao
        self.data_evento = data_evento
        self.id_organizador = id_organizador
        self.privacidade_lista = privacidade_lista

        self.url_lista = None
        self.convidados = []

    def to_dict(self):
        return self.__dict__
    
    def adicionar_convidado(self, convidado):
        self.convidados.append(convidado)
    
    def definir_url_lista(self, url):
        self.url_lista = url

    @classmethod
    def from_dict(cls, data):
        lista = cls(
            id_lista_presente=data.get("id_lista_presente"),
            nome_lista=data.get("nome_lista"),
            descricao_lista=data.get("descricao_lista"),
            ocasiao=data.get("ocasiao"),
            data_evento=data.get("data_evento"),
            id_organizador=data.get("id_organizador"),
            privacidade_lista=data.get("privacidade_lista")
        )
        lista.url_lista = data.get("url_lista")
        lista.convidados = data.get("convidados", [])
        
        return lista
    
    @classmethod
    def init_db(cls):
        if not DB_FILE.exists():
            DB_FILE.parent.mkdir(parents=True, exist_ok=True)
            with open(DB_FILE, "w", encoding="utf-8") as f:
                json.dump({"listas": []}, f)

    @classmethod
    def read_db(cls) -> Dict[str, List]:
        cls.init_db()
        with open(DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)

    @classmethod
    def write_db(cls, data: Dict):
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    @classmethod
    def salvar_lista(cls, lista: dict):
        db = cls.read_db()
        db["lista"].append(lista)
        cls.write_db(db)

    @classmethod
    def get_listas_by_user(cls, user_id: str):
        db = cls.read_db()
        return [l for l in db["listas"] if l["id_organizador"] == user_id]
    
    @classmethod
    def atualizar_lista(cls, lista_id: str, novos_dados: dict):
        db = cls.read_db()
        for i, lista in enumerate(db["listas"]):
            if lista["id_lista_presente"] == lista_id:
                db["listas"][i].update(novos_dados)
                cls.write_db(db)
                return db["listas"][i]
        return None
    
    @classmethod
    def deletar_lista(cls, lista_id: str):
        db = cls.read_db()
        novas_listas = [l for l in db["listas"] if l["id_lista_presente"] != lista_id]

        if len(novas_listas) == len(db["listas"]):
            return False  # nada foi removido

        db["listas"] = novas_listas
        cls.write_db(db)
        return True

