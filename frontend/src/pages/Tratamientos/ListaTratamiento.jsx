import React, { useEffect, useState } from 'react';  
import DataTable from 'react-data-table-component';  
import { Card, Button } from '../../components/ui';  
import ServicioTratamiento from '../../services/ServicioTratamiento';
import { useNavigate } from 'react-router-dom';

export const ListaTratamiento = () => {
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
    { name: 'Editar', selector: row => <Button onClick={() => {
      navigate(`/Menu/tratamientos/editarTratamiento/${row.id}`);
    }}>Editar</Button>},
    {
      name: "Eliminar", selector: row => (<Button onClick={() => handleDelete(row)}>Eliminar</Button>)
    }
  ];

  const getItems = async () => {
    try {
      const response = await ServicioTratamiento.get_tratamiento();  
      setData(response);  
    } catch (error) {
      console.error('Error al obtener los tratamientos:', error);  
    }
  };

  useEffect(() => {
    getItems();  
  }, []);  

  const handleDelete = async(tratamiento) => {
    const {id, nombre} = tratamiento
    if (window.confirm(`¿Quieres eliminar a ${nombre}?`)) {
      try {
        await ServicioTratamiento.eliminate_tratamiento(id);
        const eliminatedtratamiento = data.filter(tratamiento => tratamiento.id !== id);
        setData(eliminatedtratamiento);
      } catch (error) {
        console.error('Error al eliminar el tratamiento:', error);
      }
    }
  }

  return (
    <Card titulo={"Listado de Tratamientos"}>
      <DataTable columns={columns} data={data} theme="solarized" />
    </Card>
  );
};
