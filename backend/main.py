# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from controllers.user_controller import router as user_router # controller do usuario

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000", "http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# registra o controller do usuario
app.include_router(user_router)