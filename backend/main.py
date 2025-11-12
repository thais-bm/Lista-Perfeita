# backend/main.py
import json
import os
import time
import uuid
from typing import Optional, Dict, List

from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext
from jose import jwt, JWTError

from models.users import User

"""
TO DO: implementação de hash de senha
Por enquanto -> senha salva em texto plano
SECRET KEY usada


"""
SECRET_KEY = "what-happened-with-Max-Nothing-just-an-inchident-on-the-race-track"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_SECONDS = 3600  # 1 hora
DB_FILE = "database/users.json"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic schemas
class LoginInput(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# DB helpers
def init_db():
    if not os.path.exists(DB_FILE):
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump({"users": []}, f)

def read_db() -> Dict[str, List[Dict]]:
    init_db()
    with open(DB_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def write_db(data: Dict):
    with open(DB_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def get_user_by_email(email: str) -> Optional[Dict]:
    db = read_db()
    for u in db["users"]:
        if u["email"].lower() == email.lower():
            return u
    return None

def get_user_by_id(user_id: str) -> Optional[Dict]:
    db = read_db()
    for u in db["users"]:
        if u["id"] == user_id:
            return u
    return None

def create_access_token(data: dict, expires_in: int = ACCESS_TOKEN_EXPIRE_SECONDS):
    to_encode = data.copy()
    to_encode.update({"exp": int(time.time()) + expires_in})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def decode_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Token inválido ou expirado.")

def get_current_user(token: str = Depends(oauth2_scheme)) -> Dict:
    payload = decode_token(token)
    sub = payload.get("sub")
    if not sub:
        raise HTTPException(status_code=401, detail="Credenciais inválidas.")
    user = get_user_by_email(sub)
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    return user

# Rotas
@app.post("/register")
async def register(request: Request):
    data = await request.json()

    name = data.get("name")
    email = data.get("email")
    cpf = data.get("cpf")
    password = data.get("password")

    if get_user_by_email(email):
        raise HTTPException(status_code=400, detail="Email já cadastrado.")

    # cria User e salva
    new_user = User(
        id=str(uuid.uuid4()),
        name=name,
        email=email,
        cpf=cpf
    ).to_dict()

    # em vez de hash, guarda a senha em texto plano (apenas para teste!)
    new_user["password"] = password
    new_user["updated_at"] = new_user["created_at"]

    db = read_db()
    db["users"].append(new_user)
    write_db(db)

    return {
        "id": new_user["id"],
        "name": new_user["name"],
        "email": new_user["email"],
        "CPF": new_user["CPF"],
        "created_at": new_user["created_at"]
    }


@app.post("/login", response_model=Token)
def login(data: LoginInput):
    user = get_user_by_email(data.email)
    if not user or user.get("password") != data.password:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos.")
    token = create_access_token({"sub": user["email"]})
    return {"access_token": token, "token_type": "bearer"}


@app.get("/me")
def me(current_user: Dict = Depends(get_current_user)):
    return {
        "id": current_user["id"],
        "name": current_user["name"],
        "email": current_user["email"],
        "CPF": current_user["CPF"],
        "created_at": current_user["created_at"]
    }

