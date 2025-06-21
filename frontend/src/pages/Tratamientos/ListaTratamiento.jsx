import React, { useEffect, useState } from 'react';  
import DataTable from 'react-data-table-component';  
import { Card, Button } from '../../components/ui';  
import ServicioTratamiento from '../../services/ServicioTratamiento';
import ServicioRegistro from '../../services/ServicioRegistro';
import ServicioDoctor from '../../services/ServicioDoctor';
import ServicioCita from '../../services/ServicioCita';
import { useNavigate } from 'react-router-dom';

export const ListaTratamiento = () => {
  const [data, setData] = useState([]);
  const [pacientes, setPacientes] = useState({});
  const [doctores, setDoctores] = useState({});
  const [citas, setCitas] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [tratamientosData, pacientesData, doctoresData, citasData] = await Promise.all([
          ServicioTratamiento.get_tratamiento(),
          ServicioRegistro.get_paciente(),
          ServicioDoctor.get_doctor(),
          ServicioCita.get_cita()
        ]);

        // Crear objetos de búsqueda rápida
        const pacientesMap = {};
        pacientesData.forEach(paciente => {
          pacientesMap[paciente.id] = paciente.nombre;
        });

        const doctoresMap = {};
        doctoresData.forEach(doctor => {
          doctoresMap[doctor.id] = `Dr. ${doctor.nombre}`;
        });

        const citasMap = {};
        citasData.forEach(cita => {
          citasMap[cita.id] = `${cita.motivo} (${new Date(cita.fecha).toLocaleDateString()})`;
        });

        setPacientes(pacientesMap);
        setDoctores(doctoresMap);
        setCitas(citasMap);
        setData(tratamientosData);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    cargarDatos();
  }, []);

  const columns = [
    { 
      name: 'Paciente', 
      selector: row => pacientes[row.paciente_id] || 'N/A',
      sortable: true
    },
    { 
      name: 'Doctor', 
      selector: row => doctores[row.doctor_id] || 'N/A',
      sortable: true
    },
    { 
      name: 'Cita', 
      selector: row => row.cita_id ? citas[row.cita_id] || 'N/A' : 'No asignada',
      sortable: true
    },
    { 
      name: 'Tipo de Tratamiento', 
      selector: row => row.tipo_tratamiento,
      sortable: true
    },
    { 
      name: 'Dosis', 
      selector: row => row.dosis || 'No especificada'
    },
    { 
      name: 'Fecha Inicio', 
      selector: row => new Date(row.fecha_inicio).toLocaleDateString(),
      sortable: true
    },
    { 
      name: 'Fecha Fin', 
      selector: row => row.fecha_fin ? new Date(row.fecha_fin).toLocaleDateString() : 'En curso'
    },
    { 
      name: 'Notas', 
      selector: row => row.notas_tratamiento || 'Sin notas'
    },
    { 
      name: 'Resultados', 
      selector: row => row.resultados_observados || 'Sin resultados'
    },
    { 
      name: 'Editar', 
      cell: row => (
        <Button onClick={() => navigate(`/Menu/tratamientos/editarTratamiento/${row.id}`)}>
          Editar
        </Button>
      )
    },
    {
      name: "Eliminar",
      cell: row => (
        <Button onClick={() => handleDelete(row)}>
          Eliminar
        </Button>
      )
    }
  ];

  const handleDelete = async(tratamiento) => {
    const {id, paciente_id} = tratamiento;
    const nombrePaciente = pacientes[paciente_id] || 'ID ' + paciente_id;
    
    if (window.confirm(`¿Está seguro de eliminar el tratamiento del paciente ${nombrePaciente}?`)) {
      try {
        await ServicioTratamiento.eliminate_tratamiento(id);
        setData(data.filter(t => t.id !== id));
      } catch (error) {
        console.error('Error al eliminar el tratamiento:', error);
      }
    }
  };

  return (
    <Card titulo={"Listado de Tratamientos"}>
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
