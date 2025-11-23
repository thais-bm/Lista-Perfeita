from fastapi import APIRouter, HTTPException
from models.presenteado import Presenteado
from services.suggestion_service import gerar_sugestao_presente

router = APIRouter(prefix="/sugestions", tags=["sugestions"])

@router.post("/generate")
async def gerar_sugestao(presenteado: Presenteado):
    try:
        # modelo Pydantic para dict
        dados_perfil = presenteado.to_dict()
        
        # Chama o serviço que orquestra a IA
        resultado = await gerar_sugestao_presente(dados_perfil)
        
        return resultado
    
    except Exception as e:
        print(f"Erro na geração de sugestão: {e}")
        raise HTTPException(status_code=500, detail="Erro interno ao gerar sugestões.")