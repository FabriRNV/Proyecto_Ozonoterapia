import React, { useState, useEffect } from 'react';
import { Button, Input, Label, Card } from '../../components/ui';
import ServicioRegistro from '../../services/ServicioRegistro';
import ServicioDoctor from '../../services/ServicioDoctor';
import ServicioCita from '../../services/ServicioCita';

const FormTratamiento = ({ newData, setNewData, editData, isDisabled }) => {
  const [errors, setErrors] = useState({});
  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [pacientesData, doctoresData, citasData] = await Promise.all([
          ServicioRegistro.get_paciente(),
          ServicioDoctor.get_doctor(),
          ServicioCita.get_cita()
        ]);
        setPacientes(pacientesData);
        setDoctores(doctoresData);
        setCitas(citasData);
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
    if (!newData.tipo_tratamiento) newErrors.tipo_tratamiento = "El tipo de tratamiento es obligatorio.";
    if (!newData.fecha_inicio) newErrors.fecha_inicio = "La fecha de inicio es obligatoria.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="w-full flex flex-col items-center px-4 gap-6">
      <Card titulo="Gestión de Tratamientos">
        <form className="grid grid-cols-1 gap-6 sm:grid-cols-2 p-4">
          {/* Paciente */}
          <div>
            <Label htmlFor="paciente_id">Paciente</Label>
            <select
              id="paciente_id"
              name="paciente_id"
              value={newData.paciente_id || ''}
              onChange={(e) => setNewData({ ...newData, paciente_id: parseInt(e.target.value) })}
              className="w-full px-3 py-2 bg-white text-black border border-primario rounded-md shadow-sm focus:outline-none focus:ring-terciario focus:border-indigo-500"
              disabled={isDisabled}
            >
              <option value="">Seleccione un paciente</option>
              {pacientes.map((paciente) => (
                <option key={paciente.id} value={paciente.id}>
                  {paciente.nombre}
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
              className="w-full px-3 py-2 bg-white text-black border border-primario rounded-md shadow-sm focus:outline-none focus:ring-terciario focus:border-indigo-500"
              disabled={isDisabled}
            >
              <option value="">Seleccione un doctor</option>
              {doctores.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.nombre} - {doctor.especialidad}
                </option>
              ))}
            </select>
            {errors.doctor_id && <p className="text-red-500 text-xs mt-1">{errors.doctor_id}</p>}
          </div>

          {/* Cita */}
          <div>
            <Label htmlFor="cita_id">Cita</Label>
            <select
              id="cita_id"
              name="cita_id"
              value={newData.cita_id || ''}
              onChange={(e) => setNewData({ ...newData, cita_id: e.target.value ? parseInt(e.target.value) : null })}
              className="w-full px-3 py-2 bg-white text-black border border-primario rounded-md shadow-sm focus:outline-none focus:ring-terciario focus:border-indigo-500"
              disabled={isDisabled}
            >
              <option value="">Seleccione una cita</option>
              {citas
                .filter(cita => !newData.paciente_id || cita.paciente_id === newData.paciente_id)
                .map((cita) => (
                  <option key={cita.id} value={cita.id}>
                    {cita.motivo} - {new Date(cita.fecha).toLocaleDateString()}
                  </option>
                ))}
            </select>
          </div>

          {/* Tipo de Tratamiento */}
          <div>
            <Label htmlFor="tipo_tratamiento">Tipo de Tratamiento</Label>
            <Input
              id="tipo_tratamiento"
              name="tipo_tratamiento"
              value={newData.tipo_tratamiento}
              onChange={(e) => setNewData({ ...newData, tipo_tratamiento: e.target.value })}
              type="text"
              placeholder="Tipo de tratamiento"
              disabled={isDisabled}
            />
            {errors.tipo_tratamiento && <p className="text-red-500 text-xs mt-1">{errors.tipo_tratamiento}</p>}
          </div>

          {/* Dosis */}
          <div>
            <Label htmlFor="dosis">Dosis</Label>
            <Input
              id="dosis"
              name="dosis"
              value={newData.dosis}
              onChange={(e) => setNewData({ ...newData, dosis: e.target.value })}
              type="text"
              placeholder="Dosis del tratamiento"
              disabled={isDisabled}
            />
          </div>

          {/* Fecha Inicio */}
          <div>
            <Label htmlFor="fecha_inicio">Fecha de Inicio</Label>
            <Input
              id="fecha_inicio"
              name="fecha_inicio"
              value={newData.fecha_inicio}
              onChange={(e) => setNewData({ ...newData, fecha_inicio: e.target.value })}
              type="date"
              disabled={isDisabled}
            />
            {errors.fecha_inicio && <p className="text-red-500 text-xs mt-1">{errors.fecha_inicio}</p>}
          </div>

          {/* Fecha Fin */}
          <div>
            <Label htmlFor="fecha_fin">Fecha de Fin</Label>
            <Input
              id="fecha_fin"
              name="fecha_fin"
              value={newData.fecha_fin}
              onChange={(e) => setNewData({ ...newData, fecha_fin: e.target.value })}
              type="date"
              disabled={isDisabled}
            />
          </div>

          {/* Notas del Tratamiento */}
          <div>
            <Label htmlFor="notas_tratamiento">Notas del Tratamiento</Label>
            <Input
              id="notas_tratamiento"
              name="notas_tratamiento"
              value={newData.notas_tratamiento}
              onChange={(e) => setNewData({ ...newData, notas_tratamiento: e.target.value })}
              type="text"
              placeholder="Notas adicionales"
              disabled={isDisabled}
            />
          </div>

          {/* Resultados Observados */}
          <div>
            <Label htmlFor="resultados_observados">Resultados Observados</Label>
            <Input
              id="resultados_observados"
              name="resultados_observados"
              value={newData.resultados_observados}
              onChange={(e) => setNewData({ ...newData, resultados_observados: e.target.value })}
              type="text"
              placeholder="Resultados observados"
              disabled={isDisabled}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};

export default FormTratamiento;