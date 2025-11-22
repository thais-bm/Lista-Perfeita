from typing import Optional, Dict, List
import uuid

class Produto:
    def __init__( self, id: int, nome: str, descricao: str, preco: float, 
                  imagem: str, link: List[str], status: str):
        self.id = id
        self.nome = nome
        self.descricao = descricao
        self.preco = preco
        self.imagem = imagem
        self.link = link
        self.status = status

    def to_dict(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "descricao": self.descricao,
            "preco": self.preco,
            "imagem": self.imagem,
            "link": self.link,
            "status": self.status,
        }

    @classmethod
    def from_dict(cls, data):
        return cls(
            id=data["id"],
            nome=data["nome"],
            descricao=data.get("descricao", ""),
            preco=data.get("preco", 0.0),
            imagem=data.get("imagem", ""),
            link=data.get("link", []),
            status=data.get("status", "disponível"),
        )
    
    @classmethod
    def from_scraped(cls, data: Dict) -> 'Produto':
        return cls(
            id=uuid.uuid4().hex,          # gera ID único
            nome=data.get("title", "Sem nome"),
            descricao=data.get("title", "Sem descrição"),
            preco=data.get("price"),
            imagem=data.get("image", ""),
            link=[data.get("link")] if data.get("link") else [],
            status="disponível",
        )
