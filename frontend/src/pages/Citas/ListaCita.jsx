import React, { useEffect, useState } from 'react';  
import DataTable from 'react-data-table-component';  
import { Card, Button } from '../../components/ui';  
import ServicioCita from '../../services/ServicioCita';
import { useNavigate } from 'react-router-dom';

export const ListaCita = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { name: 'Paciente', selector: row => row.paciente },
    { name: 'Fecha', selector: row => row.fecha },
    { name: 'Hora', selector: row => row.hora },
    { name: 'Motivo', selector: row => row.motivo },
    { name: 'Enfermedad', selector: row => row.enfermedad },
    { name: 'Fuente', selector: row => row.fuente },
    { name: 'Editar', selector: row => <Button onClick={() => {
      navigate(`/Menu/citas/editarCita/${row.id}`);
    }}>Editar</Button>},
    {
      name: "Eliminar", selector: row => (<Button onClick={() => handleDelete(row)}>Eliminar</Button>)
    }
  ];

  const getItems = async () => {
    try {
      const response = await ServicioCita.get_cita();  
      setData(response);  
    } catch (error) {
      console.error('Error al obtener las citas:', error);   
    }
  };

  useEffect(() => {
    getItems();  
  }, []);  

  const handleDelete = async(cita) => {
    const {id, paciente} = cita
    if (window.confirm(`¿Quieres eliminar la cita de ${paciente}?`)) {
      try {
        await ServicioCita.eliminate_cita(id);
        const eliminatedCita = data.filter(cita => cita.id !== id);
        setData(eliminatedCita);
      } catch (error) {
        console.error('Error al eliminar la cita:', error);
      }
    }
  }

  return (
    <Card titulo={"Listado de Citas"}>
      <DataTable columns={columns} data={data} theme="solarized" />
    </Card>
  );
};