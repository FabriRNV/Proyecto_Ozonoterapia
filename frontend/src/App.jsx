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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="pacientes" element={<Paciente />}>
          <Route index element={<ListaRegistro />} />
          <Route path="historial" element={<ListaRegistro />} />
          <Route path='editarRegistro/:id' element={<EditarRegistro />} />
          <Route path="nuevoPaciente" element={<NuevoRegistro />} />
        </Route>
      </Route>
    </Routes>
  );
}
