# backend/controllers/C-user.py
import uuid
from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, EmailStr
from jose import jwt
import time
import dotenv
import os

from models.organizador_evento import organizador_evento as User

# Configurações do JWT 
dotenv.load_dotenv()
SECRET_KEY = str(os.getenv("USER_FILE"))
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_SECONDS = int(os.getenv("ACCESS_TOKEN_EXPIRE_SECONDS", "3600"))

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

# Função auxiliar para validar CPF (simples, apenas formato)
def is_cpf_valid(cpf):
    num = [int(digit) for digit in cpf if digit.isdigit()]
    # CPF precisa ter 11 digitos e não pode ter todos os dígitos iguais
    if len(num) != 11 or len(set(num)) == 1:
        return False
    
    # Primeiro dígito verificador
    sum_1 = sum((10 - i) * num[i] for i in range(9))
    if (sum_1 * 10 % 11) % 10 != num[9]:
        return False
    
    # Segundo dígito verificador
    sum_2 = sum((11 - i) * num[i] for i in range(10))
    if (sum_2 * 10 % 11) % 10 != num[10]:
        return False
    
    return True

@router.post("/register")
async def register(request: Request):
    data = await request.json() # Recebe os dados do corpo da requisição
    
    # Verificaacao de integridade dos dados
    if User.get_by_email(data["email"]):
        raise HTTPException(status_code=400, detail="Email já cadastrado.")
    
    if not data["password"]:
        raise HTTPException(status_code=400, detail="Senha não pode ser vazia.")
    
    if len(data["password"]) < 6:
        raise HTTPException(status_code=400, detail="Senha deve ter ao menos 6 caracteres.")
    
    if not is_cpf_valid(str(data.get("cpf"))):
        raise HTTPException(status_code=400, detail="CPF inválido.")

    # Cria um novo usuário (a senha será encriptada no método salvar)
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
    if not user or user.verify_password(data.password) is False:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos.")
    
    # Cria o token JWT e retorna
    token = create_access_token({"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}