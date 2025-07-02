from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict
from src.ai_service.model import OzonoterapiaPredictor
import numpy as np

ai_route = APIRouter()
model = OzonoterapiaPredictor()

# Datos de entrenamiento de ejemplo
X_train = np.array(
    [
        [45, 8, 12, 1, 3, 2],  # Caso positivo
        [30, 3, 2, 4, 8, 5],  # Caso negativo
        [50, 7, 10, 2, 4, 3],  # Caso positivo
        [35, 4, 3, 3, 7, 4],  # Caso negativo
        [55, 9, 15, 1, 2, 1],  # Caso positivo
        [40, 5, 5, 3, 6, 4],  # Caso negativo
    ]
)

y_train = np.array([1, 0, 1, 0, 1, 0])  # 1 para casos positivos, 0 para negativos

# Entrenar el modelo al iniciar
model.train(X_train, y_train)


class PredictionRequest(BaseModel):
    edad: int
    sintomas_dolor: int  # Escala 1-10
    tiempo_evolucion: int  # Meses
    antecedentes_medicos: int  # Número de condiciones
    nivel_actividad: int  # Escala 1-10
    tratamientos_previos: int  # Número de tratamientos


class PredictionResponse(BaseModel):
    recomendado: bool
    probabilidad: float
    explicacion: str


@ai_route.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        prediction = model.predict(request.dict())
        return prediction
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@ai_route.get("/health")
async def health_check():
    return {"status": "healthy"}
