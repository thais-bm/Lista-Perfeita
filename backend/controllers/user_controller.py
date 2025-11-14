# backend/controllers/C-user.py
import uuid
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr
from typing import Dict
from jose import jwt
import time

"""
    TO DO: Criptografia de senhas (ta salvando em texto plano) e validação de tokens JWT
"""

from models.organizador_evento import organizador_evento as User

# Configurações do JWT 
SECRET_KEY = "what-happened-with-Max-Nothing-just-an-inchident-on-the-race-track"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 3600

# Define o roteador para as rotas de usuário
router = APIRouter(prefix="/users", tags=["users"])

# Modelos Pydantic para validação de entrada e saída
class LoginInput(BaseModel):
    email: EmailStr
    password: str

# Modelo de resposta para o token JWT
class Token(BaseModel):
    access_token: str
    token_type: str

# Funcao auxiliar para criar tokens JWT
def create_access_token(data: dict, expires_in: int = ACCESS_TOKEN_EXPIRE_SECONDS):
    to_encode = data.copy()
    to_encode.update({"exp": int(time.time()) + expires_in})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register")
async def register(request: Request):
    data = await request.json() # Recebe os dados do corpo da requisição
    
    # Verifica se o email já está cadastrado
    if User.get_by_email(data["email"]):
        raise HTTPException(status_code=400, detail="Email já cadastrado.")

    # Cria um novo usuário
    new_user = User(
        id=str(uuid.uuid4()),
        name=data["name"],
        email=data["email"],
        cpf=data.get("cpf"),
        password=data["password"]
    )
    
    # salva o novo usuário no banco de dados
    new_user.salvar()

    # Retorna os dados do novo usuário (sem a senha)
    return {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "cpf": new_user.cpf,
        "created_at": new_user.created_at
    }

@router.post("/login", response_model=Token)
# Rota para login de usuário -> Recebe email e senha, retorna token JWT
def login(data: LoginInput):
    # Verifica se o usuário existe pelo email
    user = User.get_by_email(data.email)
    
    # Verifica se a senha está correta
    if not user or user.get("password") != data.password:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos.")
    
    # Cria o token JWT e retorna
    token = create_access_token({"sub": user["email"]})
    return {"access_token": token, "token_type": "bearer"}