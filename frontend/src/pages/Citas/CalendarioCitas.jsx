import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import es from 'date-fns/locale/es';
import { Card } from '../../components/ui';
import ServicioCita from '../../services/ServicioCita';
import ServicioRegistro from '../../services/ServicioRegistro';
import ServicioDoctor from '../../services/ServicioDoctor';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'es': es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Estilos personalizados para el calendario
const calendarStyles = `
  .rbc-calendar {
    background-color: #CAF0F8 !important;
    color: #00B4D8 !important;
    border-radius: 0.5rem;
    padding: 1rem;
  }

  .rbc-toolbar {
    margin-bottom: 1rem;
    color: #03045E;
  }

  .rbc-toolbar button {
    background-color: #90E0EF !important;
    color: #03045E !important;
    border-color: #00B4D8 !important;
  }

  .rbc-toolbar button:hover {
    background-color: #90E0EF !important;
    color: #03045E !important;
  }

  .rbc-toolbar button.rbc-active {
    background-color: #0077B6 !important;
    color: white !important;
  }

  .rbc-header {
    background-color: #03045E !important;
    color: #CAF0F8 !important;
    padding: 0.5rem;
    font-weight: bold;
  }

  .rbc-event {
    background-color: #00B4D8 !important;
    border-color: #00B4D8 !important;
    color: white !important;
    padding: 4px;
  }

  .rbc-event:hover {
    background-color: #0077B6 !important;
  }

  .rbc-event-content {
    color: #CAF0F8 !important;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .rbc-today {
    background-color: #0077B6 !important;
    color: #03045E !important;
  }

  .rbc-today .rbc-button-link {
    font-size: 1.25rem !important;
    font-weight: 800 !important;
    color: #03045E !important;
    background-color: #90E0EF !important;
    border-radius: 50% !important;
    padding: 4px 8px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
  }

  .rbc-off-range-bg {
    background-color: #90E0EF !important;
  }

  .rbc-toolbar-label {
    color: #03045E !important;
    font-weight: bold;
    font-size: 1.25rem;
  }

  .rbc-event-label {
    color: #CAF0F8 !important;
    font-weight: 500;
  }

  .rbc-show-more {
    background-color: #0077B6 !important;
    color: white !important;
    font-weight: 500;
  }

  .rbc-button-link {
    font-weight: 500;
    color: #03045E;
  }

  /* Estilos para las vistas de semana y día */
  .rbc-time-view {
    border-color: #00B4D8 !important;
  }

  .rbc-time-header {
    background-color: #03045E !important;
  }

  .rbc-time-header-content {
    border-color: #00B4D8 !important;
  }

  .rbc-time-content {
    border-color: #00B4D8 !important;
  }

  .rbc-timeslot-group {
    border-color: #00B4D8 !important;
  }

  .rbc-time-slot {
    border-color: #00B4D8 !important;
  }

  .rbc-time-column {
    border-color: #00B4D8 !important;
  }

  .rbc-time-gutter {
    background-color: #CAF0F8 !important;
  }

  .rbc-time-gutter .rbc-timeslot-group {
    border-color: #00B4D8 !important;
  }

  .rbc-time-gutter .rbc-label {
    color: #03045E !important;
    font-weight: 600 !important;
    font-size: 0.875rem !important;
  }

  .rbc-time-header-gutter {
    background-color: #03045E !important;
    color: #CAF0F8 !important;
  }

  .rbc-time-header-content .rbc-header {
    border-color: #00B4D8 !important;
  }

  .rbc-time-header-content .rbc-header + .rbc-header {
    border-color: #00B4D8 !important;
  }

  .rbc-time-header-content .rbc-header .rbc-button-link {
    color: #CAF0F8 !important;
    font-weight: 600 !important;
    font-size: 1.1rem !important;
    padding: 4px !important;
  }

  .rbc-time-header-content .rbc-header.rbc-today .rbc-button-link {
    color: #03045E !important;
    font-weight: 800 !important;
    background-color: #90E0EF !important;
    border-radius: 50% !important;
    padding: 4px 8px !important;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2) !important;
  }

  .rbc-time-content > * + * > * {
    border-color: #00B4D8 !important;
  }

  .rbc-time-content .rbc-today {
    background-color: #90E0EF !important;
  }

  /* Estilos para la vista de agenda */
  .rbc-agenda-view {
    border-color: #00B4D8 !important;
  }

  .rbc-agenda-view table.rbc-agenda-table {
    border-color: #00B4D8 !important;
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
    border-color: #00B4D8 !important;
  }

  .rbc-agenda-view table.rbc-agenda-table thead > tr > th {
    background-color: #03045E !important;
    color: #CAF0F8 !important;
    border-color: #00B4D8 !important;
    font-weight: 600 !important;
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr > td {
    color: #03045E !important;
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr + tr {
    border-color: #00B4D8 !important;
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr.rbc-agenda-row:hover {
    background-color: #90E0EF !important;
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr.rbc-agenda-row.rbc-agenda-today {
    background-color: #90E0EF !important;
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr.rbc-agenda-row.rbc-agenda-today td {
    color: #03045E !important;
    font-weight: 600 !important;
  }

  .rbc-agenda-view table.rbc-agenda-table tbody > tr.rbc-agenda-row.rbc-agenda-today td:first-child {
    color: #03045E !important;
    font-weight: 800 !important;
  }
`;

export const CalendarioCitas = () => {
  const [eventos, setEventos] = useState([]);
  const [pacientes, setPacientes] = useState({});
  const [doctores, setDoctores] = useState({});

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [citasData, pacientesData, doctoresData] = await Promise.all([
          ServicioCita.get_cita(),
          ServicioRegistro.get_paciente(),
          ServicioDoctor.get_doctor()
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

        setPacientes(pacientesMap);
        setDoctores(doctoresMap);

        // Convertir citas a eventos del calendario
        const eventosCalendario = citasData.map(cita => {
          const fecha = new Date(cita.fecha);
          const [hora, minutos] = cita.hora.split(':');
          fecha.setHours(parseInt(hora), parseInt(minutos));

          return {
            id: cita.id,
            title: `${pacientesMap[cita.paciente_id]} - ${cita.motivo}`,
            start: fecha,
            end: new Date(fecha.getTime() + 60 * 60 * 1000), // Duración de 1 hora por defecto
            doctor: doctoresMap[cita.doctor_id],
            motivo: cita.motivo,
            paciente: pacientesMap[cita.paciente_id]
          };
        });

        setEventos(eventosCalendario);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      }
    };

    cargarDatos();
  }, []);

  const EventoCalendario = ({ event }) => (
    <div className="p-1 text-primario">
      <div className="font-bold text-base">{event.paciente}</div>
      <div className="text-sm font-medium">{event.motivo}</div>
      <div className="text-xs font-medium">{event.doctor}</div>
    </div>
  );

  return (
    <Card titulo="Calendario de Citas">
      <div className="h-[800px] p-4">
        <style>{calendarStyles}</style>
        <Calendar
          localizer={localizer}
          events={eventos}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
            agenda: "Agenda",
            date: "Fecha",
            time: "Hora",
            event: "Evento",
            noEventsInRange: "No hay citas en este rango"
          }}
          components={{
            event: EventoCalendario
          }}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
          popup
          selectable
          culture="es"
        />
      </div>
    </Card>
  );
}; 