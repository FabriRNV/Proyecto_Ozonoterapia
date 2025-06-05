from pydantic import BaseModel
from datetime import date, time
from sqlalchemy import Column, Integer, String, Date, Time
from src.utils.database import Base



class CitaModel(Base):
    __tablename__ = "citas"

    id = Column(Integer, primary_key=True, index=True)
    paciente = Column(String)
    fecha = Column(Date)
    hora = Column(Time)
    motivo = Column(String)
    enfermedad = Column(String, nullable=True)
    fuente = Column(String, nullable=True)



class CreateCita(BaseModel):
    paciente: str
    fecha: date
    hora: time
    motivo: str
    enfermedad: str | None = None
    fuente: str | None = None


class CitaOut(BaseModel):
    id: int
    paciente: str
    fecha: date
    hora: time
    motivo: str
    enfermedad: str | None = None
    fuente: str | None = None

    model_config = {"from_attributes": True}
