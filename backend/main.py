# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from controllers.organizador_controller import router as user_router # controller do organizador
from controllers.listapresente_controller import router as giftlist_router # controller da lista de presentes
from controllers.sugestao_controller import router as suggestion_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# registra o controller do usuarioa
app.include_router(user_router)
app.include_router(giftlist_router)
app.include_router(suggestion_router)