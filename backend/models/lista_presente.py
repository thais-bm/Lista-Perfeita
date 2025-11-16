# backend/models/lista_presente.py

import pydantic
from typing import Optional, List
from datetime import date
from enum import Enum

"""
Titulo da lista
Descricao
Ocasicao
Data do evento
Privacidade da lista pode ser 1- Publica ou 2- Privada
ID do organizador (quem criou a lista)


"""

class PrivacidadeLista(str, Enum):
    COMPARTILHADA = "shared"
    PRIVADA = "private" # Corrigi o "privaty" do seu frontend

class lista_presente:
    def __init__(self, id_lista_presente=None, nome_lista=None, ocasicao=None, descricao_lista=None, data_evento=None, id_organizador=None, privacidade_lista=None):
        self.id_lista_presente = id_lista_presente
        self.nome_lista = nome_lista 
        self.descricao_lista = descricao_lista
        self.ocasicao = ocasicao
        self.data_evento = data_evento
        self.id_organizador = id_organizador
        self.privacidade_lista = None  # Inicializa o atributo privacidade_lista como None

        self.url_lista = None  # Inicializa o atributo url_lista como None
        self.convidados = []  # Inicializa a lista de convidados vazia

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
            categoria=data.get("categoria"),
            descricao_lista=data.get("descricao_lista"),
            data_evento=data.get("data_evento"),
            id_organizador=data.get("id_organizador")
        )
        lista.url_lista = data.get("url_lista")
        lista.convidados = data.get("convidados", [])
        return lista
    

