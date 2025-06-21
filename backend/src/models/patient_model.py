from pydantic import BaseModel
from datetime import date
from sqlalchemy import Column, Integer, String, Date, JSON
from sqlalchemy.orm import relationship
from src.utils.database import Base


class PatientModel(Base):
    __tablename__ = "pacientes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    fecha_nacimiento = Column(Date)
    estado_civil = Column(String, nullable=True)
    procedencia = Column(String, nullable=True)
    genero = Column(String)
    edad = Column(Integer)
    ocupacion = Column(String, nullable=True)
    telefono = Column(String, nullable=True)
    email = Column(String, nullable=True)
    antecedentes = Column(String, nullable=True)

    # Relaciones
    citas = relationship("CitaModel", back_populates="paciente_obj")
    tratamientos_recibidos = relationship(
        "TratamientoModel", back_populates="paciente_obj"
    )


class CreatePatient(BaseModel):
    nombre: str
    fecha_nacimiento: date
    estado_civil: str | None = None
    procedencia: str | None = None
    genero: str
    edad: int
    ocupacion: str | None = None
    telefono: str | None = None
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
    telefono: str | None
    email: str | None
    antecedentes: str | None
    model_config = {"from_attributes": True}
