import axios from 'axios';

// Cambia 'localhost' por la IP de tu PC si usas un dispositivo físico
const api = axios.create({
  baseURL: 'http://192.168.100.10:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
//Pacientes
export const getPacientes = () => api.get('/pacientes');
// Doctores
export const getDoctores = () => api.get('/doctores');
// Citas
export const getCitasByPaciente = (pacienteId) => api.get(`/citas/paciente/${pacienteId}`);
export const registrarCita = (data) => api.post('/citas', data);
// Tratamientos
export const getTratamientosByPaciente = (pacienteId) => api.get(`/tratamientos/paciente/${pacienteId}`);
export const registrarTratamiento = (data) => api.post('/tratamientos', data);

// (Opcional) Notificaciones: puedes simularlas o crear un endpoint en el backend
export const getNotificaciones = () => Promise.resolve({ data: [
  { id: 1, mensaje: "Tienes una cita manana a las 10:00" },
  { id: 2, mensaje: "Recuerda tomar tu medicamento a las 20:00" }
]});

export default api;