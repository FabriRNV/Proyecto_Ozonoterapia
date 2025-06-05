import React, { useEffect, useState } from 'react';  
import DataTable from 'react-data-table-component';  
import { Card, Button } from '../../components/ui';  
import ServicioRegistro from '../../services/ServicioRegistro';
import { useNavigate } from 'react-router-dom';

export const ListaRegistro = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { name: 'Nombre', selector: row => row.nombre },
    { name: 'Fecha de Nacimiento', selector: row => row.fecha_nacimiento },
    { name: 'Estado Civil', selector: row => row.estado_civil },
    { name: 'Procedencia', selector: row => row.procedencia },
    { name: 'Género', selector: row => row.genero },
    { name: 'Edad', selector: row => row.edad },
    { name: 'Ocupación', selector: row => row.ocupacion },
    { name: 'Teléfono', selector: row => row.telefono },
    { name: 'Email', selector: row => row.email },
    { name: 'Antecedentes', selector: row => row.antecedentes },
    { name: 'Editar', selector: row => <Button onClick={async () => {
      try {
        const paciente = await ServicioRegistro.getId_paciente(row.id);
        navigate(`/pacientes/editarRegistro/${paciente.id}`);
      } catch (error) {
        console.error('Error al obtener el paciente:', error);
      }
    }}>Editar</Button>},
    {
      name: "Eliminar", selector: row => (<Button onClick={() => handleDelete(row)}>Eliminar</Button>)
    }
  ];

  const getItems = async () => {
    try {
      const response = await ServicioRegistro.get_paciente();  
      setData(response);  
    } catch (error) {
      console.error('Error al obtener los pacientes:', error);  
    }
  };

  useEffect(() => {
    getItems();  
  }, []);  

  const handleDelete = async(paciente) => {
    const {id, nombre} = paciente
    if (window.confirm(`¿Quieres eliminar a ${nombre}?`)) {
      try {
        await ServicioRegistro.eliminate_paciente(id);
        const eliminatedpatient = data.filter(paciente => paciente.id !== id);
        setData(eliminatedpatient);
      } catch (error) {
        console.error('Error al eliminar la persona:', error);
      }
    }
  }

  return (
    <Card titulo={"Listado de Pacientes"}>
      <DataTable columns={columns} data={data} theme="solarized" />
    </Card>
  );
};
