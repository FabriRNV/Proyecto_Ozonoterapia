from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Date, JSON
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from fhir.resources.patient import Patient as FHIRPatient
from pydantic import BaseModel
from datetime import date
import json

# 📦 Configuración de base de datos (usá PostgreSQL en producción)
DATABASE_URL = "postgresql://postgres:FnRv3001R%3B@localhost:5432/prueba"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()

# 🧱 Modelo ORM (híbrido)
class PacienteModelo(Base):
    __tablename__ = "Pacientes"

    id = Column(Integer, primary_key=True, index=True)
    fhir_id = Column(String, unique=True, index=True)
    nombre = Column(String)
    apellido = Column(String)
    fecha_nacimiento = Column(Date, nullable=True)
    genero = Column(String)
    raw_resource = Column(JSON)  # Guarda el recurso FHIR completo

# 📦 Pydantic Schemas
class CrearPaciente(BaseModel):
    nombre: str
    apellido: str
    fecha_nacimiento: date | None = None
    genero: str # "male", "female", "other", "unknown"

class PatientOut(BaseModel):
    id: int
    fhir_id: str
    nombre: str
    apellido: str
    fecha_nacimiento: date | None
    genero: str

    model_config = {
        "from_attributes": True
    }

# 🧠 DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# 🚀 FastAPI App
# 🚀 FastAPI App
app = FastAPI()

# 🩺 Crear paciente
@app.post("/pacientes/", response_model=PatientOut)
def create_patient(paciente: CrearPaciente, db: Session = Depends(get_db)):
    fhir_patient = FHIRPatient.construct(
        id=f"pt-{paciente.nombre.lower()}-{paciente.apellido.lower()}",
        name=[{"dado": [paciente.nombre], "familia": paciente.apellido}],
        gender=paciente.genero,
        birthDate=paciente.fecha_nacimiento.isoformat() if paciente.fecha_nacimiento else None,
    )

    paciente_modelo = PacienteModelo(
        fhir_id=fhir_patient.id,
        nombre=paciente.nombre,
        apellido=paciente.apellido,
        fecha_nacimiento=paciente.fecha_nacimiento,
        genero=paciente.genero,
        raw_resource=json.loads(fhir_patient.json())
    )
    db.add(paciente_modelo)
    db.commit()
    db.refresh(paciente_modelo)
    return paciente_modelo

# 🔍 Obtener paciente por ID
@app.get("/pacientes/{paciente_id}", response_model=PatientOut)
def get_patient(paciente_id: int, db: Session = Depends(get_db)):
    paciente = db.query(PacienteModelo).filter(PacienteModelo.id == paciente_id).first()
    if not paciente:
        raise HTTPException(status_code=404, detail="Patient not found")
    return paciente

# ✅ GET /patients/ → listar todos los pacientes
@app.get("/pacientes/", response_model=list[PatientOut])
def list_patients(db: Session = Depends(get_db)):
    pacientes = db.query(PacienteModelo).all()
    return pacientes

# 📝 PUT /patients/{id} → actualizar un paciente existente
@app.put("/pacientes/{paciente_id}", response_model=PatientOut)
def update_patient(paciente_id: int, paciente: CrearPaciente, db: Session = Depends(get_db)):
    paciente_modelo = db.query(PacienteModelo).filter(PacienteModelo.id == paciente_id).first()
    if not paciente_modelo:
        raise HTTPException(status_code=404, detail="Patient not found")

    paciente_modelo.nombre = paciente.nombre
    paciente_modelo.apellido = paciente.apellido
    paciente_modelo.fecha_nacimiento = paciente.fecha_nacimiento
    paciente_modelo.genero = paciente.genero
    db.commit()
    db.refresh(paciente_modelo)
    return paciente_modelo

# ❌ DELETE /patients/{id} → eliminar un paciente
@app.delete("/pacientes/{paciente_id}", response_model=dict)
def delete_patient(paciente_id: int, db: Session = Depends(get_db)):
    paciente_modelo = db.query(PacienteModelo).filter(PacienteModelo.id == paciente_id).first()
    if not paciente_modelo:
        raise HTTPException(status_code=404, detail="Patient not found")

    db.delete(paciente_modelo)
    db.commit()
    return {"message": "Patient deleted successfully"}

# 🔍 GET /patients/search/?name=... → buscar pacientes por nombre
@app.get("/pacientes/buscar/", response_model=list[PatientOut])
def search_patients(name: str, db: Session = Depends(get_db)):
    pacientes = db.query(PacienteModelo).filter(PacienteModelo.nombre.ilike(f"%{name}%")).all()
    return pacientes

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)