from typing import Optional, Dict

"""
    Modelo de Produto
    
    -> adicionar o processo de scrapping
    por exemplo
    -> receber um termo de busca e devolver uma lista de produtos?

"""

class produto:
    def __init__(self, id: int, nome: str, preco: float, descricao: str, loja: Optional[str] = None):
        self.id = id
        self.nome = nome
        self.preco = preco
        self.descricao = descricao
        self.loja = loja # Atributo para armazenar a loja do produto
        isComprado = False  # Atributo para indicar se o produto foi comprado
        
    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "nome": self.nome,
            "preco": self.preco,
            "descricao": self.descricao,
            "loja": self.loja,
            "isComprado": self.isComprado
        }
        
    @classmethod
    def from_dict(cls, data: Dict) -> 'produto':
        return cls(
            id=data["id"],
            nome=data["nome"],
            preco=data["preco"],
            descricao=data["descricao"],
            loja=data.get("loja")
            isComprado=data.get("isComprado")
        )