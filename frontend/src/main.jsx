// Importa `StrictMode` de React, que es una herramienta para destacar posibles problemas en la aplicación.
import React from 'react'
import ReactDOM from 'react-dom/client'
// Importa `createRoot` de React DOM, que se utiliza para renderizar la aplicación en el DOM.
import { BrowserRouter } from 'react-router-dom'
// Importa los estilos globales de la aplicación desde el archivo CSS.
import './index.css';
// Importa el componente principal de la aplicación, `App`, que contiene toda la lógica y estructura de la aplicación.
import App from './App.jsx';

// Crea un punto de entrada para renderizar la aplicación en el DOM.
// `document.getElementById('root')` selecciona el elemento HTML con el id `root` como contenedor de la aplicación.
ReactDOM.createRoot(document.getElementById('root')).render(
  // `StrictMode` es un componente que envuelve la aplicación para habilitar comprobaciones adicionales y advertencias en el desarrollo.
  <BrowserRouter>
    {/* Renderiza el componente principal `App` dentro del contenedor seleccionado. */}
    <App />
  </BrowserRouter>,
);