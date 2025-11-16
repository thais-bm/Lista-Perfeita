# backend/controllers/organizador_controller.py
# backend/controllers/C-user.py
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

# Rotas da lista de presentes
@router.post("/createList")
async def criar_nova_lista(lista_data: Request):
    """
    Endpoint para criar uma nova lista de presentes.
    Recebe os dados do formulário React e retorna a lista criada.
    """

    # Primeiro, identificar quem é o usuario chamando esse endpoint
    # Depois, criar a lista associada a esse usuario

    organizador = 


@router.post("/login"n
