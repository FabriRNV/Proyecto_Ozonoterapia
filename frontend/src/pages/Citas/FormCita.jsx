import React, { useState } from 'react';
import { Button, Input, Label, Card } from '../../components/ui';

const FormCita = ({ newData, setNewData,editData, isDisabled }) => {
  const [errors, setErrors] = useState({});

  const validateFields = () => {
    let newErrors = {};
    if (!newData.paciente) newErrors.paciente = "El paciente es obligatorio.";
    if (!newData.fecha) newErrors.fecha = "La fecha es obligatoria.";
    if (!newData.hora) newErrors.hora = "La hora es obligatoria.";
    if (!newData.motivo) newErrors.motivo = "El motivo es obligatorio.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  return (
    <div className="w-full flex flex-col items-center px-4 gap-6">
      <Card titulo="Gestión de Citas Médicas">
        <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 p-4">
          {/* Paciente */}
          <div>
            <Label htmlFor="paciente">Paciente</Label>
            <Input
              id="paciente"
              name="paciente"
              value={newData.paciente}
              onChange={(e) => setNewData({ ...newData, paciente: e.target.value })}
              type="text"
              placeholder="Nombre del paciente"
              disabled={isDisabled}
            />
          </div>
          {/* Fuente */}
                    <div>
            <Label htmlFor="fuente">Fuente</Label>
            <Input
              id="fuente"
              name="fuente"
              value={newData.fuente}
              onChange={(e) => setNewData({ ...newData, fuente: e.target.value })}
              type="text"
              placeholder="Fuente de la historia"
              disabled={isDisabled}
            />
          </div>
          {/* Fecha */}
          <div>
            <Label htmlFor="fecha">Fecha</Label>
            <Input
              id="fecha"
              name="fecha"
              value={newData.fecha}
              onChange={(e) => setNewData({ ...newData, fecha: e.target.value })}
              type="date"
              disabled={isDisabled}
            />
          </div>

          {/* Hora */}
          <div>
            <Label htmlFor="hora">Hora</Label>
            <Input
              id="hora"
              name="hora"
              value={newData.hora}
              onChange={(e) => setNewData({ ...newData, hora: e.target.value })}
              type="time"
              disabled={isDisabled}
            />
          </div>


          {/* Motivo */}
          <div>
            <Label htmlFor="motivo">Motivo</Label>
            <Input
              id="motivo"
              name="motivo"
              value={newData.motivo}
              onChange={(e) => setNewData({ ...newData, motivo: e.target.value })}
              type="text"
              placeholder="Motivo de la Consulta"
              disabled={isDisabled}
            />
          </div>

          {/* Enfermedad */}
          <div>
            <Label htmlFor="enfermedad">Enfermedad</Label>
            <Input
              id="enfermedad"
              name="enfermedad"
              value={newData.enfermedad}
              onChange={(e) => setNewData({ ...newData, enfermedad: e.target.value })}
              type="text"
              placeholder="Enfermedad actual"
              disabled={isDisabled}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FormCita;