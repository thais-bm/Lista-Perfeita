from typing import Optional, Dict, List
class Presenteado:
    def __init__(self, nome: str = "", idade: int = 0, genero: str = "", ocasiao: str = "",
                 min_preco: float = 0.0, max_preco: float = 0.0, interesses: Optional[List[str]] = None):
        self.nome: str= nome
        self.idade: int = idade
        self.genero: str = genero
        self.ocasiao: str = ocasiao
        self.min_preco: float = min_preco
        self.max_preco: float = max_preco
        self.interesses: List[str] = interesses if interesses is not None else []

    def to_dict(self) -> Dict:
        return {
            "nome": self.nome,
            "idade": self.idade,
            "genero": self.genero,
            "ocasiao": self.ocasiao,
            "min_preco": self.min_preco,
            "max_preco": self.max_preco,
            "interesses": self.interesses
        }
    
    @classmethod
    def from_dict(cls, data: Dict) -> 'Presenteado':
        return cls(
            nome=data.get("nome", ""),
            idade=data.get("idade", 0),
            genero=data.get("genero", ""),
            ocasiao=data.get("ocasiao", ""),
            min_preco=data.get("min_preco", 0.0),
            max_preco=data.get("max_preco", 0.0),
            interesses=data.get("interesses", [])
        )
    
    