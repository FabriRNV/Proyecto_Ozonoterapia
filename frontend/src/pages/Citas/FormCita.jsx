import React, { useState, useEffect } from 'react';
import { Button, Input, Label, Card } from '../../components/ui';
import ServicioRegistro from '../../services/ServicioRegistro';
import ServicioDoctor from '../../services/ServicioDoctor';

const FormCita = ({ newData, setNewData, editData, isDisabled }) => {
  const [errors, setErrors] = useState({});
  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const pacientesData = await ServicioRegistro.get_paciente();
        const doctoresData = await ServicioDoctor.get_doctor();
        setPacientes(pacientesData);
        setDoctores(doctoresData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };
    cargarDatos();
  }, []);

  const validateFields = () => {
    let newErrors = {};
    if (!newData.paciente_id) newErrors.paciente_id = "El paciente es obligatorio.";
    if (!newData.doctor_id) newErrors.doctor_id = "El doctor es obligatorio.";
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
            <Label htmlFor="paciente_id">Paciente</Label>
            <select
              id="paciente_id"
              name="paciente_id"
              value={newData.paciente_id || ''}
              onChange={(e) => setNewData({ ...newData, paciente_id: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border  bg-white  text-black border border-primario rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              disabled={isDisabled}
            >
              <option value="">Seleccione un paciente</option>
              {pacientes.map((paciente) => (
                <option key={paciente.id} value={paciente.id}>
                  {paciente.nombre} {paciente.apellido}
                </option>
              ))}
            </select>
            {errors.paciente_id && <p className="text-red-500 text-xs mt-1">{errors.paciente_id}</p>}
          </div>

          {/* Doctor */}
          <div>
            <Label htmlFor="doctor_id">Doctor</Label>
            <select
              id="doctor_id"
              name="doctor_id"
              value={newData.doctor_id || ''}
              onChange={(e) => setNewData({ ...newData, doctor_id: parseInt(e.target.value) })}
              className="w-full px-3 py-2 bg-white  text-black border border-primario rounded-md shadow-sm focus:outline-none focus:ring-terciario focus:border-indigo-500"
              disabled={isDisabled}
            >
              <option value="">Seleccione un doctor</option>
              {doctores.map((doctor) => (
                <option placeholder="Enfermedad actual" key={doctor.id} value={doctor.id}>
                  Dr. {doctor.nombre} {doctor.apellido} - {doctor.especialidad}
                </option>
              ))}
            </select>
            {errors.doctor_id && <p className="text-red-500 text-xs mt-1">{errors.doctor_id}</p>}
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
            {errors.fecha && <p className="text-red-500 text-xs mt-1">{errors.fecha}</p>}
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
            {errors.hora && <p className="text-red-500 text-xs mt-1">{errors.hora}</p>}
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
            {errors.motivo && <p className="text-red-500 text-xs mt-1">{errors.motivo}</p>}
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
        </form>
      </Card>
    </div>
  );
};

export default FormCita;