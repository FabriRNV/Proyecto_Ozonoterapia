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
          doctoresMap[doctor.id] = `Dr. ${doctor.nombre} ${doctor.apellido}`;
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
    <div className="p-1">
      <div className="font-bold">{event.paciente}</div>
      <div className="text-sm">{event.motivo}</div>
      <div className="text-xs">{event.doctor}</div>
    </div>
  );

  return (
    <Card titulo="Calendario de Citas">
      <div className="h-[800px] p-4">
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