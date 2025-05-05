import { useEffect, useState } from 'react' // Import React hooks for managing state and side effects
import { Button, Card, Input, Label } from '../../components/ui' // Import UI components
import ServicioRegistro from '../../services/ServicioRegistro' // Import service to handle API calls for items
import { useParams,useNavigate } from 'react-router-dom'


export const EditarRegistro = () => {
  const [selectedPatient, setSelectedPatient] = useState({
    nombre: "",
    fecha_nacimiento: "",
    estado_civil: "",
    procedencia: "",
    genero: "",
    edad: "",
    ocupacion: "",
    telefono: "",
    email: "",
    antecedentes: ""
  })
  const params = useParams()
  const navigate = useNavigate()
  
  const getPatient = async(id) => {
    try {
      const response = await ServicioRegistro.get_paciente();
      const patient = response.find(p => p.id === parseInt(id));
      if (patient) {
        setSelectedPatient(patient);
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  };
 
  useEffect(() => {
    if (params.id) {
      getPatient(params.id).catch(err => console.error(err));
    }
  }, [params.id]);

  const handleSubmit = async(event) => {
    event.preventDefault(); 
    try {
      await ServicioRegistro.update_paciente(selectedPatient);
      navigate('/pacientes/ListaRegistro');
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  }

  return (
    <Card titulo={"Editar Paciente"}> {/* Card component to display the form */}
      <form onSubmit={handleSubmit} className='mt-2 p-6 md:p-8'> 
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Nombre */}
          <div>
            <Label>Nombre</Label>
            <Input 
              value={selectedPatient.nombre || ''} 
              onChange={e => setSelectedPatient({...selectedPatient, nombre: e.target.value})}
            />
          </div>
          
          {/* Fecha de Nacimiento */}
          <div>
            <Label>Fecha de Nacimiento</Label>
            <Input 
              value={selectedPatient.fecha_nacimiento || ''}
              onChange={e => setSelectedPatient({...selectedPatient, fecha_nacimiento: e.target.value})}
              type="date"
            />
          </div>

          {/* Estado Civil */}
          <div>
            <Label>Estado Civil</Label>
            <Input 
              value={selectedPatient.estado_civil || ''}
              onChange={e => setSelectedPatient({...selectedPatient, estado_civil: e.target.value})}
            />
          </div>

          {/* Procedencia */}
          <div>
            <Label>Procedencia</Label>
            <Input 
              value={selectedPatient.procedencia || ''}
              onChange={e => setSelectedPatient({...selectedPatient, procedencia: e.target.value})}
            />
          </div>

          {/* Género */}
          <div>
            <Label>Género</Label>
            <Input 
              value={selectedPatient.genero || ''}
              onChange={e => setSelectedPatient({...selectedPatient, genero: e.target.value})}
            />
          </div>

          {/* Edad */}
          <div>
            <Label>Edad</Label>
            <Input 
              value={selectedPatient.edad || ''}
              onChange={e => setSelectedPatient({...selectedPatient, edad: e.target.value})}
              type="number"
            />
          </div>

          {/* Ocupación */}
          <div>
            <Label>Ocupación</Label>
            <Input 
              value={selectedPatient.ocupacion || ''}
              onChange={e => setSelectedPatient({...selectedPatient, ocupacion: e.target.value})}
            />
          </div>

          {/* Teléfono */}
          <div>
            <Label>Teléfono</Label>
            <Input 
              value={selectedPatient.telefono || ''}
              onChange={e => setSelectedPatient({...selectedPatient, telefono: e.target.value})}
              type="tel"
            />
          </div>

          {/* Email */}
          <div>
            <Label>Email</Label>
            <Input 
              value={selectedPatient.email || ''}
              onChange={e => setSelectedPatient({...selectedPatient, email: e.target.value})}
              type="email"
            />
          </div>

          {/* Antecedentes */}
          <div>
            <Label>Antecedentes</Label>
            <Input 
              value={selectedPatient.antecedentes || ''}
              onChange={e => setSelectedPatient({...selectedPatient, antecedentes: e.target.value})}
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
