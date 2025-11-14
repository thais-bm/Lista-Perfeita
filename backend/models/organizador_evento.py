# backend/model/user.py
import json, os
from pathlib import Path
from typing import Optional, Dict, List
from datetime import datetime
import uuid
import dotenv


class organizador_evento:
    dotenv.load_dotenv()
    DB_FILE = Path(os.getenv("USER_FILE"))
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
                return u
        return None

    @classmethod
    def get_by_id(cls, user_id: str) -> Optional[Dict]:
        db = cls.read_db()
        for u in db["users"]:
            if u["id"] == user_id:
                return u
        return None
    
    def salvar(self):
        db = self.read_db()
        db["users"].append(self.to_dict())
        self.write_db(db)

