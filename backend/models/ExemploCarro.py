"""
Models

    Representa os dados e as regras de negócios relacionadas a eles

    Responsável por lidar com a lógica de negócios do aplicativo e acessar os dados. 

    Pelo que eu li, é as classes que definem a estrutura dos dados e as operações que podem ser realizadas sobre esses dados.


"""

# /models/car.py
from pydantic import BaseModel  
  
  
class Car(BaseModel):  
    id: str  
    name: str