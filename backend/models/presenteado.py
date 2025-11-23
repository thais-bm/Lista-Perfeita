from pydantic import BaseModel, Field, field_validator
from typing import List, Optional

class Presenteado(BaseModel):
    nome: str = Field(..., description="Nome da pessoa a ser presenteada", min_length=1)
    idade: int = Field(..., gt=0, description="Idade deve ser maior que 0")
    genero: str = Field(..., description="Gênero selecionado no formulário")
    ocasiao: str = Field(..., description="Ocasião do presente (ex: Aniversário, Natal)")
    min_preco: float = Field(..., ge=0, description="Preço mínimo, não pode ser negativo")
    max_preco: float = Field(..., ge=0, description="Preço máximo, não pode ser negativo")
    interesses: List[str] = Field(default_factory=list, description="Lista de interesses")

    # Método auxiliar para exportar como dicionário (o Pydantic já tem .model_dump(), 
    def to_dict(self):
        return self.model_dump()

    # Validação extra: Garante que o preço máximo seja maior que o mínimo
    @field_validator('max_preco')
    @classmethod
    def validar_faixa_preco(cls, v: float, info):
        values = info.data
        if 'min_preco' in values and v < values['min_preco']:
            raise ValueError('O preço máximo deve ser maior ou igual ao preço mínimo')
        return v