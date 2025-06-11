from pydantic import BaseModel
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from src.utils.database import Base


class DoctorModel(Base):
    __tablename__ = "doctores"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    especialidad = Column(String, nullable=True)
    telefono = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=True)
    licencia_medica = Column(String, unique=True, nullable=False)

    # Relaciones
    citas = relationship("CitaModel", back_populates="doctor")
    tratamientos_aplicados = relationship(
        "TratamientoModel", back_populates="doctor_que_aplica"
    )


class CreateDoctor(BaseModel):
    nombre: str
    especialidad: str | None = None
    telefono: str | None = None
    email: str | None = None
    licencia_medica: str


class DoctorOut(BaseModel):
    id: int
    nombre: str
    especialidad: str | None
    telefono: str | None
    email: str | None
    licencia_medica: str

    model_config = {"from_attributes": True}
