import uuid
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr
from jose import jwt
import time
import dotenv
import os

from models.presenteado import presenteado as presente

# Define o roteador para as rotas da sugestao
router = APIRouter(prefix="/sugestions", tags=["sugestions"])



