# backend/controllers/C-user.py
import uuid
from fastapi import APIRouter, HTTPException, Request, Depends
from pydantic import BaseModel, EmailStr
from typing import Dict
from jose import jwt, JWTError
import time

from models.users import User

SECRET_KEY = "what-happened-with-Max-Nothing-just-an-inchident-on-the-race-track"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 3600

router = APIRouter(prefix="/users", tags=["users"])

class LoginInput(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

def create_access_token(data: dict, expires_in: int = ACCESS_TOKEN_EXPIRE_SECONDS):
    to_encode = data.copy()
    to_encode.update({"exp": int(time.time()) + expires_in})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post("/register")
async def register(request: Request):
    data = await request.json()
    if User.get_by_email(data["email"]):
        raise HTTPException(status_code=400, detail="Email já cadastrado.")

    new_user = User(
        id=str(uuid.uuid4()),
        name=data["name"],
        email=data["email"],
        cpf=data.get("cpf"),
        password=data["password"]
    )
    new_user.salvar()

    return {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "cpf": new_user.cpf,
        "created_at": new_user.created_at
    }

@router.post("/login", response_model=Token)
def login(data: LoginInput):
    user = User.get_by_email(data.email)
    if not user or user.get("password") != data.password:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos.")
    token = create_access_token({"sub": user["email"]})
    return {"access_token": token, "token_type": "bearer"}