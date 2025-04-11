import React from 'react';
// Importa las funciones y componentes necesarios de 'react-router-dom' para configurar las rutas de la aplicación.
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import {Layout} from './components/Layout';
import {Paciente} from './pages/Registros/Paciente';
import {ListaRegistro} from './pages/Registros/ListaRegistro';
import {NuevoRegistro} from './pages/Registros/NuevoRegistro';


// Configuración del enrutador utilizando 'createBrowserRouter'.
// 'createRoutesFromElements' permite definir las rutas directamente en JSX.
const router = createBrowserRouter(
  createRoutesFromElements(
    // Define una ruta con el path "/" que renderiza el componente 'Home'.
    <Route path="/" element={<Layout />}>
      <Route path='pacientes' element={<Paciente />}>
          <Route path='Historial' element={<ListaRegistro />} /> 
          <Route path='nuevoPaciente' element={<NuevoRegistro />} />
      </Route>
    </Route>
  )
);

// Componente principal de la aplicación.
function App() {
  return (
    <>
      {/* 'RouterProvider' es el componente que conecta el enrutador configurado con la aplicación. */}
      <RouterProvider router={router}/>
    </>
  );
}

export default App; // Exporta el componente 'App' para que pueda ser utilizado en otros archivos.