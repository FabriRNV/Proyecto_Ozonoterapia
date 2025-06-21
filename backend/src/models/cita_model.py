from pydantic import BaseModel
from datetime import date, time
from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from src.utils.database import Base


class CitaModel(Base):
    __tablename__ = "citas"

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("pacientes.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctores.id"), nullable=False)
    fecha = Column(Date)
    hora = Column(Time)
    motivo = Column(String)
    enfermedad = Column(String, nullable=True)
    fuente = Column(String, nullable=True)

    # Relaciones
    paciente_obj = relationship("PatientModel", back_populates="citas")
    doctor = relationship("DoctorModel", back_populates="citas")
    tratamientos = relationship("TratamientoModel", back_populates="cita_asociada")


class CreateCita(BaseModel):
    paciente_id: int
    doctor_id: int
    fecha: date
    hora: time
    motivo: str
    enfermedad: str | None = None
    fuente: str | None = None


class CitaOut(BaseModel):
    id: int
    paciente_id: int
    doctor_id: int
    fecha: date
    hora: time
    motivo: str
    enfermedad: str | None = None
    fuente: str | None = None

    model_config = {"from_attributes": True}
