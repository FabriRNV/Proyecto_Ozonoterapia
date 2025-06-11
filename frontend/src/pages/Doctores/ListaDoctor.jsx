import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Card, Button } from '../../components/ui';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/axios';

export const ListaDoctor = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { name: 'Nombre', selector: row => row.nombre },
    { name: 'Especialidad', selector: row => row.especialidad },
    { name: 'Teléfono', selector: row => row.telefono },
    { name: 'Email', selector: row => row.email },
    { name: 'Licencia Médica', selector: row => row.licencia_medica },
    { name: 'Editar', selector: row => <Button onClick={() => {
      navigate(`/Menu/doctores/editarDoctor/${row.id}`);
    }}>Editar</Button>},
    {
      name: "Eliminar", selector: row => (<Button onClick={() => handleDelete(row)}>Eliminar</Button>)
    }
  ];

  const getItems = async () => {
    try {
      const response = await api.get('/api/doctores/');
      setData(response.data);
    } catch (error) {
      console.error('Error al obtener los doctores:', error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleDelete = async(doctor) => {
    const {id, nombre} = doctor;
    if (window.confirm(`¿Quieres eliminar al doctor ${nombre}?`)) {
      try {
        await api.delete(`/api/doctores/${id}`);
        const eliminatedDoctor = data.filter(doctor => doctor.id !== id);
        setData(eliminatedDoctor);
      } catch (error) {
        console.error('Error al eliminar el doctor:', error);
      }
    }
  };

  return (
    <Card titulo={"Listado de Doctores"}>
      <DataTable columns={columns} data={data} 
      theme="solarized"
      pagination
      highlightOnHover
      responsive
      />
    </Card>
  );
}; 