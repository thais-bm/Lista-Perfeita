# backend/controllers/organizador_controller.py
import uuid
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr
from jose import jwt
import time
import dotenv
import os

from models.organizador_evento import organizador_evento as User

# Define o roteador para as rotas de usuário
router = APIRouter(prefix="/giftlist", tags=["giftlist"])

"""
ATENCAO
NADA AQUI ESTA IMPLEMENTADO AINDA, APENAS OS ENDPOINTS FORAM CRIADOS
PORQUE EU TENHO QUE PENSAR MELHOR NA LOGICA DE CADA UM DELES
ELES SAO SUGESTOES INICIAIS DO QUE PODE SER FEITO

E EU TO DE SACO CHEIO DESSE TRABALHO AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

"""


# Rotas da lista de presentes
@router.post("/createList")
async def criar_nova_lista(lista_data: Request):
    """
    Endpoint para criar uma nova lista de presentes.
    Recebe os dados do formulário React e retorna a lista criada.
    """

    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, criar a lista associada a esse usuario
    # Retornar a lista criada

@router.get("/getLists")
async def obter_listas_presentes(request: Request):
    """
    Endpoint para obter todas as listas de presentes associadas ao usuário autenticado.
    """
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, buscar todas as listas associadas a esse usuario
    # Retornar as listas encontradas

@router.delete("/deleteList/{list_id}")
async def deletar_lista_presente(list_id: str, request: Request):
    """
    Endpoint para deletar uma lista de presentes pelo ID.
    """
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, deletar a lista
    # Retornar uma mensagem de sucesso ou erro

@router.put("/updateList/{list_id}")
async def atualizar_lista_presente(list_id: str, lista_data: Request):
    """
    Endpoint para atualizar uma lista de presentes pelo ID.
    Recebe os dados atualizados do formulário React.
    """
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, atualizar a lista com os novos dados
    # Retornar a lista atualizada ou uma mensagem de erro

@router.post("/addItem/{list_id}")
async def adicionar_item_lista(list_id: str, item_data: Request):
    """
    Endpoint para adicionar um item a uma lista de presentes.
    Recebe os dados do item do formulário React.
    """
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, adicionar o item à lista
    # Retornar a lista atualizada ou uma mensagem de erro

@router.delete("/removeItem/{list_id}/{item_id}")
async def remover_item_lista(list_id: str, item_id: str, request: Request):
    """
    Endpoint para remover um item de uma lista de presentes pelo ID do item.
    """
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, remover o item da lista
    # Retornar a lista atualizada ou uma mensagem de erro

@router.get("/getItems/{list_id}")
async def obter_itens_lista(list_id: str, request: Request):
    """
    Endpoint para obter todos os itens de uma lista de presentes pelo ID da lista.
    """
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, buscar todos os itens da lista
    # Retornar os itens encontrados ou uma mensagem de erro

@router.post("/markItem/{list_id}/{item_id}")
async def marcar_item_comprado(list_id: str, item_id: str, request: Request):
    """
    Endpoint para marcar um item como comprado em uma lista de presentes.
    """
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, marcar o item como comprado
    # Retornar a lista atualizada ou uma mensagem de erro

@router.post("/unmarkItem/{list_id}/{item_id}")
async def desmarcar_item_comprado(list_id: str, item_id: str, request: Request):
     """
     Endpoint para desmarcar um item como comprado em uma lista de presentes.
     """
     # Primeiro, identificar quem é o usuario chamando esse endpoint
     # Depois, verificar se a lista pertence a esse usuario
     # Se pertencer, desmarcar o item como comprado
     # Retornar a lista atualizada ou uma mensagem de erro

@router.get("/shareList/{list_id}")
async def compartilhar_lista(list_id: str, request: Request):
    """
    Endpoint para compartilhar uma lista de presentes.
    Retorna um link compartilhável.
    """
    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, verificar se a lista pertence a esse usuario
    # Se pertencer, gerar um link compartilhável para a lista
    # Opcao de disparar mensagem para os convidados via numero de telefone (whatsapp) ou email
    # Retornar o link ou uma mensagem de erro

@router.get("/viewSharedList/{share_token}")
async def visualizar_lista_compartilhada(share_token: str):
    """
    Endpoint para visualizar uma lista de presentes compartilhada via token.
    """
    # Verificar a validade do token de compartilhamento
    # Buscar a lista associada ao token
    # Retornar a lista encontrada ou uma mensagem de erro

