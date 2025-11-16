# backend/model/user.py
import json, os
from pathlib import Path
from typing import Optional, Dict, List
from datetime import datetime
import bcrypt
import dotenv

dotenv.load_dotenv()
db_path_str = os.getenv("USER_FILE")
if db_path_str is None:
    raise ValueError("A variável de ambiente 'USER_FILE' não foi definida.")

DB_FILE = Path(db_path_str)

class organizador_evento:
    def __init__(self, id: str, name: str, email: str, cpf: str, password: str,
                 created_at: Optional[str] = None, updated_at: Optional[str] = None):
        self.id = id
        self.name = name
        self.email = email
        self.cpf = cpf
        self.password = password
        self.created_at = created_at or datetime.now().isoformat()
        self.updated_at = updated_at or datetime.now().isoformat()

    def to_dict(self):
        return self.__dict__

    @classmethod
    def init_db(cls):
        if not DB_FILE.exists():
            DB_FILE.parent.mkdir(parents=True, exist_ok=True)
            with open(DB_FILE, "w", encoding="utf-8") as f:
                json.dump({"users": []}, f)

    @classmethod
    def read_db(cls) -> Dict[str, List[Dict]]:
        cls.init_db()
        with open(DB_FILE, "r", encoding="utf-8") as f:
            return json.load(f)

    @classmethod
    def write_db(cls, data: Dict):
        with open(DB_FILE, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

    @classmethod
    def get_by_email(cls, email: str) -> Optional[Dict]:
        db = cls.read_db()
        for u in db["users"]:
            if u["email"].lower() == email.lower():
                return cls(**u) # instancia de organizador_evento
        return None

    @classmethod
    def get_by_id(cls, user_id: str) -> Optional[Dict]:
        db = cls.read_db()
        for u in db["users"]:
            if u["id"] == user_id:
                return cls(**u) # instancia de organizador_evento
        return None
    
    def salvar(self):
        self.encript_password() # Encrypt the password before saving
        db = self.read_db()
        db["users"].append(self.to_dict())
        self.write_db(db)

    def encript_password(self):
        salt = bcrypt.gensalt()
        hash_bytes = bcrypt.hashpw(self.password.encode('utf-8'), salt)
        self.password = hash_bytes.decode('utf-8')

    def verify_password(self, plain_password: str) -> bool:
        plain_bytes = plain_password.encode('utf-8')
        hash_bytes = self.password.encode('utf-8') 
        return bcrypt.checkpw(plain_bytes, hash_bytes)

    def is_cpf_valid(self) -> bool:
        num = [int(digit) for digit in self.cpf if digit.isdigit()]

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
