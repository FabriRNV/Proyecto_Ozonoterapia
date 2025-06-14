import { useEffect, useState } from 'react' // Import React hooks for managing state and side effects
import { Button, Card, Input, Label } from '../../components/ui' // Import UI components
import ServicioTratamiento from '../../services/ServicioTratamiento' // Import service to handle API calls for items
import ServicioRegistro from '../../services/ServicioRegistro';
import ServicioDoctor from '../../services/ServicioDoctor';
import ServicioCita from '../../services/ServicioCita';
import { useParams, useNavigate } from 'react-router-dom'

export const EditarTratamiento = () => {
  const [selectedTratamiento, setSelectedTratamiento] = useState({
    paciente_id: "",
    doctor_id: "",
    cita_id: "",
    tipo_tratamiento: "",
    dosis: "",
    fecha_inicio: "",
    fecha_fin: "",
    notas_tratamiento: "",
    resultados_observados: ""
  });
  const [pacientes, setPacientes] = useState([]);
  const [doctores, setDoctores] = useState([]);
  const [citas, setCitas] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [tratamiento, pacientesData, doctoresData, citasData] = await Promise.all([
          params.id ? ServicioTratamiento.getId_tratamiento(params.id) : null,
          ServicioRegistro.get_paciente(),
          ServicioDoctor.get_doctor(),
          ServicioCita.get_cita()
        ]);

        if (tratamiento) {
          setSelectedTratamiento(tratamiento);
        }
        setPacientes(pacientesData);
        setDoctores(doctoresData);
        setCitas(citasData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    cargarDatos();
  }, [params.id]);

  const handleSubmit = async(event) => {
    event.preventDefault(); 
    try {
      await ServicioTratamiento.update_tratamiento(selectedTratamiento);
      navigate("/Menu/tratamientos/listaTratamientos");
    } catch (error) {
      console.error('Error al actualizar tratamiento:', error);
    }
  }

  return (
    <Card titulo={"Editar Tratamiento"}>
      <form onSubmit={handleSubmit} className='mt-2 p-6 md:p-8'> 
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Paciente */}
          <div>
            <Label htmlFor="paciente_id">Paciente</Label>
            <select
              id="paciente_id"
              name="paciente_id"
              value={selectedTratamiento.paciente_id || ''}
              onChange={e => setSelectedTratamiento({...selectedTratamiento, paciente_id: parseInt(e.target.value)})}
              className="w-full px-3 py-2 bg-white text-black border border-primario rounded-md shadow-sm focus:outline-none focus:ring-terciario focus:border-indigo-500"
            >
              <option value="">Seleccione un paciente</option>
              {pacientes.map((paciente) => (
                <option key={paciente.id} value={paciente.id}>
                  {paciente.nombre}
                </option>
              ))}
            </select>
          </div>
          
          {/* Doctor */}
          <div>
            <Label htmlFor="doctor_id">Doctor</Label>
            <select
              id="doctor_id"
              name="doctor_id"
              value={selectedTratamiento.doctor_id || ''}
              onChange={e => setSelectedTratamiento({...selectedTratamiento, doctor_id: parseInt(e.target.value)})}
              className="w-full px-3 py-2 bg-white text-black border border-primario rounded-md shadow-sm focus:outline-none focus:ring-terciario focus:border-indigo-500"
            >
              <option value="">Seleccione un doctor</option>
              {doctores.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  Dr. {doctor.nombre} - {doctor.especialidad}
                </option>
              ))}
            </select>
          </div>

          {/* Cita */}
          <div>
            <Label htmlFor="cita_id">Cita (Opcional)</Label>
            <select
              id="cita_id"
              name="cita_id"
              value={selectedTratamiento.cita_id || ''}
              onChange={e => setSelectedTratamiento({...selectedTratamiento, cita_id: e.target.value ? parseInt(e.target.value) : null})}
              className="w-full px-3 py-2 bg-white text-black border border-primario rounded-md shadow-sm focus:outline-none focus:ring-terciario focus:border-indigo-500"
            >
              <option value="">Seleccione una cita</option>
              {citas
                .filter(cita => !selectedTratamiento.paciente_id || cita.paciente_id === selectedTratamiento.paciente_id)
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
              value={selectedTratamiento.tipo_tratamiento || ''}
              onChange={e => setSelectedTratamiento({...selectedTratamiento, tipo_tratamiento: e.target.value})}
            />
          </div>

          {/* Dosis */}
          <div>
            <Label htmlFor="dosis">Dosis (Opcional)</Label>
            <Input 
              id="dosis"
              name="dosis"
              value={selectedTratamiento.dosis || ''}
              onChange={e => setSelectedTratamiento({...selectedTratamiento, dosis: e.target.value})}
            />
          </div>

          {/* Fecha Inicio */}
          <div>
            <Label htmlFor="fecha_inicio">Fecha de Inicio</Label>
            <Input 
              id="fecha_inicio"
              name="fecha_inicio"
              value={selectedTratamiento.fecha_inicio || ''}
              onChange={e => setSelectedTratamiento({...selectedTratamiento, fecha_inicio: e.target.value})}
              type="date"
            />
          </div>

          {/* Fecha Fin */}
          <div>
            <Label htmlFor="fecha_fin">Fecha de Fin (Opcional)</Label>
            <Input 
              id="fecha_fin"
              name="fecha_fin"
              value={selectedTratamiento.fecha_fin || ''}
              onChange={e => setSelectedTratamiento({...selectedTratamiento, fecha_fin: e.target.value})}
              type="date"
            />
          </div>

          {/* Notas del Tratamiento */}
          <div>
            <Label htmlFor="notas_tratamiento">Notas del Tratamiento (Opcional)</Label>
            <Input 
              id="notas_tratamiento"
              name="notas_tratamiento"
              value={selectedTratamiento.notas_tratamiento || ''}
              onChange={e => setSelectedTratamiento({...selectedTratamiento, notas_tratamiento: e.target.value})}
            />
          </div>

          {/* Resultados Observados */}
          <div>
            <Label htmlFor="resultados_observados">Resultados Observados (Opcional)</Label>
            <Input 
              id="resultados_observados"
              name="resultados_observados"
              value={selectedTratamiento.resultados_observados || ''}
              onChange={e => setSelectedTratamiento({...selectedTratamiento, resultados_observados: e.target.value})}
            />
          </div>
        </div>

        <div className="mt-6">
          <Button type="submit">Guardar Cambios</Button>
        </div>
      </form>
    </Card>
  )
}
