from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from src.models.tratamiento_model import CreateTratamiento, TratamientoOut, TratamientoModel
from src.utils.database import SessionLocal

tratamiento_route = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@tratamiento_route.post("/", response_model=TratamientoOut)
def create_tratamiento(tratamiento: CreateTratamiento, db: Session = Depends(get_db)):
    tratamiento_model = TratamientoModel(
        paciente_id=tratamiento.paciente_id,
        doctor_id=tratamiento.doctor_id,
        cita_id=tratamiento.cita_id,
        tipo_tratamiento=tratamiento.tipo_tratamiento,
        dosis=tratamiento.dosis,
        fecha_inicio=tratamiento.fecha_inicio,
        fecha_fin=tratamiento.fecha_fin,
        notas_tratamiento=tratamiento.notas_tratamiento,
        resultados_observados=tratamiento.resultados_observados
    )
    db.add(tratamiento_model)
    db.commit()
    db.refresh(tratamiento_model)
    return tratamiento_model


@tratamiento_route.get("/{id_tratamiento}", response_model=TratamientoOut)
def get_tratamiento(id_tratamiento: int, db: Session = Depends(get_db)):
    tratamiento = db.query(TratamientoModel).filter(TratamientoModel.id == id_tratamiento).first()
    if not tratamiento:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")
    return tratamiento


@tratamiento_route.get("/", response_model=list[TratamientoOut])
def list_tratamientos(db: Session = Depends(get_db)):
    tratamientos = db.query(TratamientoModel).all()
    return tratamientos


@tratamiento_route.put("/{id_tratamiento}", response_model=TratamientoOut)
def update_tratamiento(id_tratamiento: int, tratamiento: CreateTratamiento, db: Session = Depends(get_db)):
    tratamiento_model = db.query(TratamientoModel).filter(TratamientoModel.id == id_tratamiento).first()
    if not tratamiento_model:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")

    for field, value in tratamiento.dict().items():
        setattr(tratamiento_model, field, value)
    db.commit()
    db.refresh(tratamiento_model)
    return tratamiento_model


@tratamiento_route.delete("/{id_tratamiento}", response_model=dict)
def delete_tratamiento(id_tratamiento: int, db: Session = Depends(get_db)):
    tratamiento_model = db.query(TratamientoModel).filter(TratamientoModel.id == id_tratamiento).first()
    if not tratamiento_model:
        raise HTTPException(status_code=404, detail="Tratamiento no encontrado")

    db.delete(tratamiento_model)
    db.commit()
    return {"MENSAJE": "Tratamiento eliminado correctamente"}


@tratamiento_route.get("/paciente/{paciente_id}", response_model=list[TratamientoOut])
def get_tratamientos_by_paciente(paciente_id: int, db: Session = Depends(get_db)):
    tratamientos = db.query(TratamientoModel).filter(TratamientoModel.paciente_id == paciente_id).all()
    return tratamientos


@tratamiento_route.get("/doctor/{doctor_id}", response_model=list[TratamientoOut])
def get_tratamientos_by_doctor(doctor_id: int, db: Session = Depends(get_db)):
    tratamientos = db.query(TratamientoModel).filter(TratamientoModel.doctor_id == doctor_id).all()
    return tratamientos