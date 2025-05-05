from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.patient_router import patient_route
from src.utils.database import Base, engine
from src.models import patient_model

# Crea las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# 🚀 FastAPI App
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto según la URL de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patient_route, prefix="/pacientes")

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
