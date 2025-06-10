import { useEffect, useState } from 'react' // Import React hooks for managing state and side effects
import { Button, Card, Input, Label } from '../../components/ui' // Import UI components
import ServicioTratamiento from '../../services/ServicioTratamiento' // Import service to handle API calls for items
import { useParams,useNavigate } from 'react-router-dom'
import { useAgeCalculator } from '../../hooks/useAgeCalculator'


export const EditarTratamiento = () => {
  const [selectedTratamiento, setSelectedTratamiento] = useState({
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
  const { handleBirthDateChange } = useAgeCalculator()
  

  
  const getTratamiento = async(id) => {
    try {
      const response = await ServicioTratamiento.get_tratamiento();
      const tratamiento = response.find(p => p.id === parseInt(id));
      if (tratamiento) {
        setSelectedTratamiento(tratamiento);
      }
    } catch (error) {
      console.error('Error obteniendo los datos de los tratamientos:', error);
    }
  };
 
  useEffect(() => {
    if (params.id) {
      getTratamiento(params.id).catch(err => console.error(err));
    }
  }, [params.id]);

  const handleSubmit = async(event) => {
    event.preventDefault(); 
    try {
      await ServicioTratamiento.update_tratamiento(selectedTratamiento);
      navigate("/Menu/tratamientos/listaTratamientos");
    } catch (error) {
      console.error('Error al actualizar tratamiento', error);
    }
  }

  return (
    <Card titulo={"Editar Tratamiento"}> 
      <form onSubmit={handleSubmit} className='mt-2 p-6 md:p-8'> 
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Nombre */}
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input 
              id="nombre"
              name="nombre"
              value={selectedTratamiento.nombre || ''} 
              onChange={e => setSelectedTratamiento({...selectedTratamiento, nombre: e.target.value})}
            />
          </div>
          
          {/* Fecha de Nacimiento */}
          <div>
            <Label htmlFor="fecha_nacimiento">Fecha de Nacimiento</Label>
            <Input 
              id="fecha_nacimiento"
              name="fecha_nacimiento"
              value={selectedPatient.fecha_nacimiento || ''}
              onChange={e => handleBirthDateChange(e.target.value, setSelectedPatient)}
              type="date"
            />
          </div>

          {/* Estado Civil */}
          <div>
            <Label htmlFor="estado_civil">Estado Civil</Label>
            <Input 
              id="estado_civil"
              name="estado_civil"
              value={selectedPatient.estado_civil || ''}
              onChange={e => setSelectedPatient({...selectedPatient, estado_civil: e.target.value})}
              list="estado-civil-options"
            />
            <datalist id="estado-civil-options">
              {estadoCivilOptions.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
          </div>

          {/* Procedencia */}
          <div>
            <Label htmlFor="procedencia">Procedencia</Label>
            <Input 
              id="procedencia"
              name="procedencia"
              value={selectedPatient.procedencia || ''}
              onChange={e => setSelectedPatient({...selectedPatient, procedencia: e.target.value})}
              list="procedencia-options"
            />
            <datalist id="procedencia-options">
              {procedenciaOptions.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
          </div>

          {/* Género */}
          <div>
            <Label htmlFor="genero">Género</Label>
            <Input 
              id="genero"
              name="genero"
              value={selectedPatient.genero || ''}
              onChange={e => setSelectedPatient({...selectedPatient, genero: e.target.value})}
              list="genero-options"
            />
            <datalist id="genero-options">
              {generoOptions.map((option, index) => (
                <option key={index} value={option} />
              ))}
            </datalist>
          </div>

          {/* Edad */}
          <div>
            <Label htmlFor="edad">Edad</Label>
            <Input 
              id="edad"
              name="edad"
              value={selectedPatient.edad || ''}
              type="number"
            />
          </div>

          {/* Ocupación */}
          <div>
            <Label htmlFor="ocupacion">Ocupación</Label>
            <Input 
              id="ocupacion"
              name="ocupacion"
              value={selectedPatient.ocupacion || ''}
              onChange={e => setSelectedPatient({...selectedPatient, ocupacion: e.target.value})}
            />
          </div>

          {/* Teléfono */}
          <div>
            <Label htmlFor="telefono">Teléfono</Label>
            <Input 
              id="telefono"
              name="telefono"
              value={selectedPatient.telefono || ''}
              onChange={e => setSelectedPatient({...selectedPatient, telefono: e.target.value})}
              type="tel"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              name="email"
              value={selectedPatient.email || ''}
              onChange={e => setSelectedPatient({...selectedPatient, email: e.target.value})}
              type="email"
            />
          </div>

          {/* Antecedentes */}
          <div>
            <Label htmlFor="antecedentes">Antecedentes</Label>
            <Input 
              id="antecedentes"
              name="antecedentes"
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
