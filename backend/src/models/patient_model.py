from pydantic import BaseModel
from datetime import date
from sqlalchemy import Column, Integer, String, Date, JSON
from src.utils.database import Base


# 🧱 Modelo ORM (híbrido)
class PatientModel(Base):
    __tablename__ = "pacientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    fecha_nacimiento = Column(Date, nullable=True)
    estado_civil = Column(String, nullable=True)
    procedencia = Column(String, nullable=True)
    genero = Column(String)
    edad = Column(Integer, nullable=True)
    ocupacion = Column(String, nullable=True)
    telefono = Column(Integer, nullable=True)
    email = Column(String, nullable=True)
    antecedentes = Column(String, nullable=True)



# 📦 Pydantic Schemas
class CreatePatient(BaseModel):
    nombre: str
    fecha_nacimiento: date
    estado_civil: str | None = None
    procedencia: str | None = None
    genero: str  # "male", "female", "other", "unknown"
    edad: int
    ocupacion: str | None = None
    telefono: int | None = None
    email: str | None = None
    antecedentes: str | None = None


class PatientOut(BaseModel):
    id: int
    nombre: str
    fecha_nacimiento: date
    estado_civil: str | None
    procedencia: str | None
    genero: str
    edad: int
    ocupacion: str | None
    telefono: int | None
    email: str | None
    antecedentes: str | None
    model_config = {"from_attributes": True}
