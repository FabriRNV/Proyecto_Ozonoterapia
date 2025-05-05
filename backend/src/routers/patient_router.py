
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from src.models.patient_model import CreatePatient, PatientOut, PatientModel
from src.utils.database import SessionLocal

patient_route = APIRouter()


# 🧠 DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🩺 Crear paciente
@patient_route.post("/", response_model=PatientOut)
def create_patient(patient: CreatePatient, db: Session = Depends(get_db)):
    patient_model = PatientModel(

        nombre=patient.nombre,
        fecha_nacimiento=patient.fecha_nacimiento,
        estado_civil=patient.estado_civil,
        procedencia=patient.procedencia,
        genero=patient.genero,
        edad=patient.edad,
        ocupacion=patient.ocupacion,
        telefono=patient.telefono,
        email=patient.email,
        antecedentes=patient.antecedentes
    )
    db.add(patient_model)
    db.commit()
    db.refresh(patient_model)
    return patient_model


# 🔍 Obtener paciente por ID
@patient_route.get("/{id_patient}", response_model=PatientOut)
def get_patient(id_patient: int, db: Session = Depends(get_db)):
    patient = db.query(PatientModel).filter(PatientModel.id == id_patient).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")
    return patient


# ✅ GET /patients/ → listar todos los pacientes
@patient_route.get("/", response_model=list[PatientOut])
def list_patients(db: Session = Depends(get_db)):
    patients = db.query(PatientModel).all()
    return patients


# 📝 PUT /patients/{id} → actualizar un paciente existente
@patient_route.put("/{id_patient}", response_model=PatientOut)
def update_patient(id_patient: int, patient: CreatePatient, db: Session = Depends(get_db)):
    patient_model = db.query(PatientModel).filter(PatientModel.id == id_patient).first()
    if not patient_model:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    for field, value in patient.dict().items():
        setattr(patient_model, field, value)
    db.commit()
    db.refresh(patient_model)
    return patient_model


# ❌ DELETE /patients/{id} → eliminar un paciente
@patient_route.delete("/{id_patient}", response_model=dict)
def delete_patient(id_patient: int, db: Session = Depends(get_db)):
    patient_model = (
        db.query(PatientModel).filter(PatientModel.id == id_patient).first()
    )
    if not patient_model:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    db.delete(patient_model)
    db.commit()
    return {"MENSAJE": "Paciente eliminado correctamente"}


# 🔍 GET /patients/search/?name=... → buscar pacientes por nombre
@patient_route.get("/buscar/", response_model=list[PatientOut])
def search_patients(name: str, db: Session = Depends(get_db)):
    patients = (
        db.query(PatientModel).filter(PatientModel.nombre.ilike(f"%{name}%")).all()
    )
    return patients