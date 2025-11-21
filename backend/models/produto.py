from typing import Optional, Dict, List

"""
 Duvidas: A IA é um serviço ou uma entidade ou um controlador?
 na hora de salvar os produtos pesquisados -> CHAMAR O MODELO PRODUTO.PY PARA ISSO. SÓ ELE SALVA
"""

class Produto:
    def __init__( self, id: int, nome: str, descricao: str, preco: float, 
                imagem: str, link: List[str],
                status: str, isComprado: Optional[bool] = False
    ):  
        self.id = id
        self.nome = nome
        self.descricao = descricao
        self.preco = preco
        self.imagem = imagem
        self.link = link
        self.status = status

    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "nome": self.nome,
            "preco": self.preco,
            "descricao": self.descricao,
            "imagem": self.imagem,
            "link": self.link,
            "status": self.status,
        }

    @classmethod
    def from_dict(cls, data: Dict) -> 'Produto':
        return cls(
            id=data["id"],
            nome=data["nome"],
            preco=data["preco"],
            descricao=data["descricao"],
            imagem=data.get("imagem", ""),
            link=data.get("link", []),
            status=data.get("status", "indefinido"),
        )