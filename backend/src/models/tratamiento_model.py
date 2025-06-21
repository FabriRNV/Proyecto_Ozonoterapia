from pydantic import BaseModel
from datetime import date
from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from src.utils.database import Base


class TratamientoModel(Base):
    __tablename__ = "tratamientos"

    id = Column(Integer, primary_key=True, index=True)
    paciente_id = Column(Integer, ForeignKey("pacientes.id"), nullable=False)
    doctor_id = Column(Integer, ForeignKey("doctores.id"), nullable=False)
    cita_id = Column(Integer, ForeignKey("citas.id"), nullable=True)

    tipo_tratamiento = Column(String, nullable=False)
    dosis = Column(String, nullable=True)
    fecha_inicio = Column(Date, nullable=False)
    fecha_fin = Column(Date, nullable=True)
    notas_tratamiento = Column(String, nullable=True)
    resultados_observados = Column(String, nullable=True)

    # Relaciones
    paciente_obj = relationship("PatientModel", back_populates="tratamientos_recibidos")
    doctor_que_aplica = relationship(
        "DoctorModel", back_populates="tratamientos_aplicados"
    )
    cita_asociada = relationship("CitaModel", back_populates="tratamientos")


class CreateTratamiento(BaseModel):
    paciente_id: int
    doctor_id: int
    cita_id: int | None = None
    tipo_tratamiento: str
    dosis: str | None = None
    fecha_inicio: date
    fecha_fin: date | None = None
    notas_tratamiento: str | None = None
    resultados_observados: str | None = None


class TratamientoOut(BaseModel):
    id: int
    paciente_id: int
    doctor_id: int
    cita_id: int | None
    tipo_tratamiento: str
    dosis: str | None
    fecha_inicio: date
    fecha_fin: date | None
    notas_tratamiento: str | None
    resultados_observados: str | None

    model_config = {"from_attributes": True}
