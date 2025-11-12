# backend/model/user.py
from datetime import datetime
from typing import Optional

class User:
    def __init__(self, name: str, email: str, cpf: Optional[str], id: Optional[str] = None, created_at: Optional[str] = None, updated_at: Optional[str] = None):
        self.id = id
        self.name = name
        self.email = email
        self.CPF = cpf
        self.created_at = created_at or datetime.now().isoformat()
        self.updated_at = updated_at or datetime.now().isoformat()
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'CPF': self.CPF,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
    
    @classmethod
    def from_dict(cls, data: dict):
        return cls(
            id=data.get('id'),
            name=data.get('name'),
            email=data.get('email'),
            cpf=data.get('CPF'),
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )