from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.routers.patient_router import patient_route
from src.routers.cita_router import cita_route
from src.utils.database import Base, engine


# Crea las tablas en la base de datos
Base.metadata.create_all(bind=engine)

# 🚀 FastAPI App
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patient_route, prefix="/pacientes")
app.include_router(cita_route, prefix="/citas")

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
