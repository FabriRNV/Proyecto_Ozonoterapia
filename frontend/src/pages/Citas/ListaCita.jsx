import React, { useEffect, useState } from 'react';  
import DataTable from 'react-data-table-component';  
import { Card, Button } from '../../components/ui';  
import ServicioCita from '../../services/ServicioCita';
import ServicioRegistro from '../../services/ServicioRegistro';
import ServicioDoctor from '../../services/ServicioDoctor';
import { useNavigate } from 'react-router-dom';

export const ListaCita = () => {
  const [data, setData] = useState([]);
  const [pacientes, setPacientes] = useState({});
  const [doctores, setDoctores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [citasData, pacientesData, doctoresData] = await Promise.all([
          ServicioCita.get_cita(),
          ServicioRegistro.get_paciente(),
          ServicioDoctor.get_doctor()
        ]);

        // Crear objetos de búsqueda rápida para pacientes y doctores
        const pacientesMap = {};
        pacientesData.forEach(paciente => {
          pacientesMap[paciente.id] = paciente.nombre;
        });

        const doctoresMap = {};
        doctoresData.forEach(doctor => {
          doctoresMap[doctor.id] = `Dr. ${doctor.nombre} ${doctor.apellido}`;
        });

        setPacientes(pacientesMap);
        setDoctores(doctoresMap);
        setData(citasData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    cargarDatos();
  }, []);

  const columns = [
    { 
      name: 'Paciente', 
      selector: row => pacientes[row.paciente_id] || `ID: ${row.paciente_id}`,
      sortable: true
    },
    { 
      name: 'Doctor', 
      selector: row => doctores[row.doctor_id] || `ID: ${row.doctor_id}`,
      sortable: true
    },
    { 
      name: 'Fecha', 
      selector: row => row.fecha,
      sortable: true
    },
    { 
      name: 'Hora', 
      selector: row => row.hora,
      sortable: true
    },
    { 
      name: 'Motivo', 
      selector: row => row.motivo,
      sortable: true
    },
    { 
      name: 'Enfermedad', 
      selector: row => row.enfermedad || '-',
      sortable: true
    },
    { 
      name: 'Fuente', 
      selector: row => row.fuente || '-',
      sortable: true
    },
    { 
      name: 'Editar', 
      selector: row => <Button onClick={() => {
        navigate(`/Menu/citas/editarCita/${row.id}`);
      }}>Editar</Button>
    },
    {
      name: "Eliminar", 
      selector: row => (<Button onClick={() => handleDelete(row)}>Eliminar</Button>)
    }
  ];

  const handleDelete = async(cita) => {
    const {id, paciente_id} = cita;
    const nombrePaciente = pacientes[paciente_id] || `ID: ${paciente_id}`;
    if (window.confirm(`¿Quieres eliminar la cita del paciente ${nombrePaciente}?`)) {
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
      <DataTable 
        columns={columns} 
        data={data} 
        theme="solarized"
        pagination
        highlightOnHover
        responsive
      />
    </Card>
  );
};