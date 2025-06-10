import { useEffect, useState } from 'react' // Import React hooks for managing state and side effects
import { Button, Card, Input, Label } from '../../components/ui' // Import UI components
import ServicioCita from '../../services/ServicioCita' // Import service to handle API calls for items
import { useParams,useNavigate } from 'react-router-dom'


export const EditarCita = () => {
  const [selectedCita, setSelectedCita] = useState({
    paciente: "",
    fecha: "",
    hora: "",
    motivo: "",
    enfermedad: "",
    fuente: ""
  })
  const params = useParams()
  const navigate = useNavigate()
  
  const getCita = async(id) => {
    try {
      const cita = await ServicioCita.getId_cita(id);
      if (cita) {
        setSelectedCita(cita);
      }
    } catch (error) {
      console.error('Error obteniendo los datos de cita:', error);
    }
  };
 
  useEffect(() => {
    if (params.id) {
      getCita(params.id).catch(err => console.error(err));
    }
  }, [params.id]);

  const handleSubmit = async(event) => {
    event.preventDefault(); 
    try {
      await ServicioCita.update_cita(selectedCita);
      navigate("/Menu/citas/listaCitas");
    } catch (error) {
      console.error('Error al actualizar cita:', error);
    }
  }

  return (
    <Card titulo={"Editar Cita"}> {/* Card component to display the form */}
      <form onSubmit={handleSubmit} className='mt-2 p-6 md:p-8'> 
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Paciente */}
          <div>
            <Label htmlFor="paciente">Paciente</Label>
            <Input 
              id="paciente"
              name="paciente"
              value={selectedCita.paciente || ''} 
              onChange={e => setSelectedCita({...selectedCita, paciente: e.target.value})}
            />
          </div>
          
          {/* Fuente */}
          <div>
            <Label htmlFor="fuente">Fuente</Label>
            <Input 
              id="fuente"
              name="fuente"
              value={selectedCita.fuente || ''}
              onChange={e => setSelectedCita({...selectedCita, fuente: e.target.value})}
            />
          </div>

          {/* Fecha */}
          <div>
            <Label htmlFor="fecha">Fecha</Label>
            <Input 
              id="fecha"
              name="fecha"
              value={selectedCita.fecha || ''}
              onChange={e => setSelectedCita({...selectedCita, fecha: e.target.value})}
              type="date"
            />
          </div>

          {/* Hora */}
          <div>
            <Label htmlFor="hora">Hora</Label>
            <Input 
              id="hora"
              name="hora"
              value={selectedCita.hora || ''}
              onChange={e => setSelectedCita({...selectedCita, hora: e.target.value})}
              type="time"
            />
          </div>

          {/* Motivo */}
          <div>
            <Label htmlFor="motivo">Motivo</Label>
            <Input 
              id="motivo"
              name="motivo"
              value={selectedCita.motivo || ''}
              onChange={e => setSelectedCita({...selectedCita, motivo: e.target.value})}
            />
          </div>

          {/* Enfermedad */}
          <div>
            <Label htmlFor="enfermedad">Enfermedad</Label>
            <Input 
              id="enfermedad"
              name="enfermedad"
              value={selectedCita.enfermedad || ''}
              onChange={e => setSelectedCita({...selectedCita, enfermedad: e.target.value})}
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
