from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from src.models.cita_model import CreateCita, CitaOut, CitaModel
from src.models.patient_model import PatientModel
from src.models.doctor_model import DoctorModel
from src.utils.database import SessionLocal
from src.utils.email_service import email_service

cita_route = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@cita_route.post("/", response_model=CitaOut)
async def create_cita(cita: CreateCita, db: Session = Depends(get_db)):
    # Verificar que el paciente existe
    paciente = (
        db.query(PatientModel).filter(PatientModel.id == cita.paciente_id).first()
    )
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    # Verificar que el doctor existe
    doctor = db.query(DoctorModel).filter(DoctorModel.id == cita.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor no encontrado")

    cita_model = CitaModel(
        paciente_id=cita.paciente_id,
        doctor_id=cita.doctor_id,
        fecha=cita.fecha,
        hora=cita.hora,
        motivo=cita.motivo,
        enfermedad=cita.enfermedad,
        fuente=cita.fuente,
    )
    db.add(cita_model)
    db.commit()
    db.refresh(cita_model)

    # Preparar datos para el correo
    cita_data = {
        "paciente_nombre": f"{paciente.nombre}",
        "doctor_nombre": f"Dr. {doctor.nombre}",
        "fecha": str(cita.fecha),
        "hora": str(cita.hora),
        "motivo": cita.motivo,
    }

    # Enviar notificaciones por correo
    try:
        await email_service.send_cita_notification(
            doctor_email=doctor.email,
            paciente_email=paciente.email,
            cita_data=cita_data,
        )
    except Exception as e:
        print(f"Error al enviar correos: {str(e)}")
        # No lanzamos excepción para no interrumpir la creación de la cita

    return cita_model


# 🔍 Obtener cita por ID
@cita_route.get("/{id_cita}", response_model=CitaOut)
def get_cita(id_cita: int, db: Session = Depends(get_db)):
    cita = db.query(CitaModel).filter(CitaModel.id == id_cita).first()
    if not cita:
        raise HTTPException(status_code=404, detail="Cita no encontrada")
    return cita


# ✅ GET /citas/ → listar todas las citas
@cita_route.get("/", response_model=list[CitaOut])
def list_citas(db: Session = Depends(get_db)):
    citas = db.query(CitaModel).all()
    return citas


# 📝 PUT /citas/{id} → actualizar una cita existente
@cita_route.put("/{id_cita}", response_model=CitaOut)
def update_cita(id_cita: int, cita: CreateCita, db: Session = Depends(get_db)):
    cita_model = db.query(CitaModel).filter(CitaModel.id == id_cita).first()
    if not cita_model:
        raise HTTPException(status_code=404, detail="Cita no encontrada")

    # Verificar que el paciente existe
    paciente = (
        db.query(PatientModel).filter(PatientModel.id == cita.paciente_id).first()
    )
    if not paciente:
        raise HTTPException(status_code=404, detail="Paciente no encontrado")

    # Verificar que el doctor existe
    doctor = db.query(DoctorModel).filter(DoctorModel.id == cita.doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor no encontrado")

    for field, value in cita.dict().items():
        setattr(cita_model, field, value)
    db.commit()
    db.refresh(cita_model)
    return cita_model


# ❌ DELETE /citas/{id} → eliminar una cita
@cita_route.delete("/{id_cita}", response_model=dict)
def delete_cita(id_cita: int, db: Session = Depends(get_db)):
    cita_model = db.query(CitaModel).filter(CitaModel.id == id_cita).first()
    if not cita_model:
        raise HTTPException(status_code=404, detail="Cita no encontrada")

    db.delete(cita_model)
    db.commit()
    return {"MENSAJE": "Cita eliminada correctamente"}


# 🔍 GET /citas/buscar/?paciente=... → buscar citas por paciente
@cita_route.get("/buscar/", response_model=list[CitaOut])
def search_citas(paciente: str, db: Session = Depends(get_db)):
    citas = db.query(CitaModel).filter(CitaModel.paciente.ilike(f"%{paciente}%")).all()
    return citas


@cita_route.get("/paciente/{paciente_id}", response_model=list[CitaOut])
def get_citas_by_paciente(paciente_id: int, db: Session = Depends(get_db)):
    citas = db.query(CitaModel).filter(CitaModel.paciente_id == paciente_id).all()
    return citas


@cita_route.get("/doctor/{doctor_id}", response_model=list[CitaOut])
def get_citas_by_doctor(doctor_id: int, db: Session = Depends(get_db)):
    citas = db.query(CitaModel).filter(CitaModel.doctor_id == doctor_id).all()
    return citas
