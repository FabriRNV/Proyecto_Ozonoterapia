from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from src.models.cita_model import CreateCita, CitaOut, CitaModel
from src.utils.database import SessionLocal

cita_route = APIRouter()



def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@cita_route.post("/", response_model=CitaOut)
def create_cita(cita: CreateCita, db: Session = Depends(get_db)):
    cita_model = CitaModel(
        paciente=cita.paciente,
        fecha=cita.fecha,
        hora=cita.hora,
        motivo=cita.motivo,
        enfermedad=cita.enfermedad,
        fuente=cita.fuente,
    )
    db.add(cita_model)
    db.commit()
    db.refresh(cita_model)
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
