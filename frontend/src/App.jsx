import React from 'react';
// Importa las funciones y componentes necesarios de 'react-router-dom' para configurar las rutas de la aplicación.
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
// Importa el componente 'Home', que será el componente principal para la ruta "/".
import {Layout} from './components/Layout';
import {Registro} from './pages/Registros/Registro';
// Configuración del enrutador utilizando 'createBrowserRouter'.
// 'createRoutesFromElements' permite definir las rutas directamente en JSX.
const router = createBrowserRouter(
  createRoutesFromElements(
    // Define una ruta con el path "/" que renderiza el componente 'Home'.
    <Route path="/" element={<Layout />}>
       <Route path='registros' element={<Registro />}>
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