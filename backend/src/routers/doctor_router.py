from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from src.models.doctor_model import CreateDoctor, DoctorOut, DoctorModel
from src.utils.database import SessionLocal

doctor_route = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@doctor_route.post("/", response_model=DoctorOut)
def create_doctor(doctor: CreateDoctor, db: Session = Depends(get_db)):
    doctor_model = DoctorModel(
        nombre=doctor.nombre,
        especialidad=doctor.especialidad,
        telefono=doctor.telefono,
        email=doctor.email,
        licencia_medica=doctor.licencia_medica,
    )
    db.add(doctor_model)
    db.commit()
    db.refresh(doctor_model)
    return doctor_model


@doctor_route.get("/{id_doctor}", response_model=DoctorOut)
def get_doctor(id_doctor: int, db: Session = Depends(get_db)):
    doctor = db.query(DoctorModel).filter(DoctorModel.id == id_doctor).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor no encontrado")
    return doctor


@doctor_route.get("/", response_model=list[DoctorOut])
def list_doctors(db: Session = Depends(get_db)):
    doctors = db.query(DoctorModel).all()
    return doctors


@doctor_route.put("/{id_doctor}", response_model=DoctorOut)
def update_doctor(id_doctor: int, doctor: CreateDoctor, db: Session = Depends(get_db)):
    doctor_model = db.query(DoctorModel).filter(DoctorModel.id == id_doctor).first()
    if not doctor_model:
        raise HTTPException(status_code=404, detail="Doctor no encontrado")

    for field, value in doctor.dict().items():
        setattr(doctor_model, field, value)
    db.commit()
    db.refresh(doctor_model)
    return doctor_model


@doctor_route.delete("/{id_doctor}", response_model=dict)
def delete_doctor(id_doctor: int, db: Session = Depends(get_db)):
    doctor_model = db.query(DoctorModel).filter(DoctorModel.id == id_doctor).first()
    if not doctor_model:
        raise HTTPException(status_code=404, detail="Doctor no encontrado")

    db.delete(doctor_model)
    db.commit()
    return {"MENSAJE": "Doctor eliminado correctamente"}


@doctor_route.get("/buscar/", response_model=list[DoctorOut])
def search_doctors(nombre: str, db: Session = Depends(get_db)):
    doctors = (
        db.query(DoctorModel).filter(DoctorModel.nombre.ilike(f"%{nombre}%")).all()
    )
    return doctors
