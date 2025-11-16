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