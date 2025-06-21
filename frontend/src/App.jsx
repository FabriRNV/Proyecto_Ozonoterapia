import React from "react";
// Importa las funciones y componentes necesarios de 'react-router-dom' para configurar las rutas de la aplicación.
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Layout } from "./components/Layout";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";

import { Paciente } from "./pages/Registros/Paciente";
import { ListaRegistro } from "./pages/Registros/ListaRegistro";
import { NuevoRegistro } from "./pages/Registros/NuevoRegistro";
import { EditarRegistro } from "./pages/Registros/EditarRegistro";

import { Doctor } from "./pages/Doctores/Doctor";
import { ListaDoctor} from "./pages/Doctores/ListaDoctor";
import { NuevoDoctor } from "./pages/Doctores/NuevoDoctor";
import { EditarDoctor } from "./pages/Doctores/EditarDoctor";

import { Cita } from "./pages/Citas/Cita";
import { ListaCita } from "./pages/Citas/ListaCita";
import { NuevaCita } from "./pages/Citas/NuevaCita";
import { EditarCita } from "./pages/Citas/EditarCita";
import { CalendarioCitas } from "./pages/Citas/CalendarioCitas";

import { Tratamiento } from "./pages/Tratamientos/Tratamiento";
import { ListaTratamiento } from "./pages/Tratamientos/ListaTratamiento";
import { NuevoTratamiento } from "./pages/Tratamientos/NuevoTratamiento";
import { EditarTratamiento } from "./pages/Tratamientos/EditarTratamiento";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/auth/google/callback" element={<Login />} />
      <Route
        path="/Menu"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/Menu/pacientes" replace />} />
        <Route path="pacientes" element={<Paciente />}>
          <Route index element={<ListaRegistro />} />
          <Route path="historial" element={<ListaRegistro />} />
          <Route path="nuevoPaciente" element={<NuevoRegistro />} />
          <Route path="editarRegistro/:id" element={<EditarRegistro />} />
        </Route>
        <Route path="doctores" element={<Doctor />}>
          <Route index element={<ListaDoctor />} />
          <Route path="listaDoctores" element={<ListaDoctor />} />
          <Route path="nuevoDoctor" element={<NuevoDoctor />} />
          <Route path="editarDoctor/:id" element={<EditarDoctor />} />
        </Route>
        <Route path="citas" element={<Cita />}>
          <Route index element={<ListaCita />} />
          <Route path="listaCitas" element={<ListaCita />} />
          <Route path="nuevaCita" element={<NuevaCita />} />
          <Route path='editarCita/:id' element={<EditarCita/>} />
          <Route path='calendario' element={<CalendarioCitas/>} />
        </Route>
        <Route path="tratamientos" element={<Tratamiento />}>
          <Route index element={<ListaTratamiento />} />
          <Route path="listaTratamientos" element={<ListaTratamiento />} />
          <Route path="nuevoTratamiento" element={<NuevoTratamiento />} />
          <Route path='editarTratamiento/:id' element={<EditarTratamiento/>} />
        </Route>
      </Route>
    </Routes>
  );
}
