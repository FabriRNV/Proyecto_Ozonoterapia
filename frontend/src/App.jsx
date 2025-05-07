import React from "react";
// Importa las funciones y componentes necesarios de 'react-router-dom' para configurar las rutas de la aplicación.
import {
  Route,
  Routes,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import { Layout } from "./components/Layout";

import { Paciente } from "./pages/Registros/Paciente";
import { ListaRegistro } from "./pages/Registros/ListaRegistro";
import { NuevoRegistro } from "./pages/Registros/NuevoRegistro";
import { EditarRegistro } from "./pages/Registros/EditarRegistro";

import { Cita } from "./pages/Citas/Cita";
import { ListaCita } from "./pages/Citas/ListaCita";
import { NuevaCita } from "./pages/Citas/NuevaCita";
import { EditarCita } from "./pages/Citas/EditarCita";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="pacientes" element={<Paciente />}>
          <Route index element={<ListaRegistro />} />
          <Route path="historial" element={<ListaRegistro />} />
          <Route path="nuevoPaciente" element={<NuevoRegistro />} />
          <Route path='editarRegistro/:id' element={<EditarRegistro />} />
        </Route>
        <Route path="citas" element={<Cita />}>
          <Route index element={<ListaCita />} />
          <Route path="listaCitas" element={<ListaCita />} />
          <Route path="nuevaCita" element={<NuevaCita />} />
          <Route path='editarCita/:id' element={<EditarCita/>} />
        </Route>
      </Route>
    </Routes>
  );
}
