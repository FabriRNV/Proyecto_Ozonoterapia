from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Dict, Optional, List
from model import OzonoterapiaPredictor, PATOLOGIAS
import os

app = FastAPI(title="Ozonoterapia AI Service")
model = OzonoterapiaPredictor()

# Cargar modelo entrenado si existe
MODEL_PATH = "ozonoterapia_model.joblib"
if os.path.exists(MODEL_PATH):
    model.load_model(MODEL_PATH)


class PredictionRequest(BaseModel):
    edad: int
    genero: str
    motivo: str
    tipo_tratamiento: str
    dosis: str
    resultados_observados: str


class PatologiaProbabilidad(BaseModel):
    patologia: str
    probabilidad: float


class PredictionResponse(BaseModel):
    patologia_predicha: str
    probabilidad: float
    ranking: List[PatologiaProbabilidad]


@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        prediction = model.predict(request.dict())
        # Adaptar el ranking a la respuesta Pydantic
        ranking = [PatologiaProbabilidad(**r) for r in prediction["ranking"]]
        return PredictionResponse(
            patologia_predicha=prediction["patologia_predicha"],
            probabilidad=prediction["probabilidad"],
            ranking=ranking,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
