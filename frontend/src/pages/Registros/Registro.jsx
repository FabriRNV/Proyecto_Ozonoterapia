import { useState } from 'react';
// Importa el hook `useState` de React para manejar el estado del componente.

import { ItemsNav } from '../../components/nav/_nav';
// Importa `ItemsNav`, que contiene los elementos de navegación.

import { Outlet } from 'react-router-dom';
// Importa `Outlet` de React Router para renderizar rutas anidadas.

import { Loader } from '../../components/widgets/Loader';
// Importa el componente `Loader`, que muestra un indicador de carga.

import Tabs from '../../components/Tabs/tabs';
// Importa el componente `Tabs`, que se utiliza para la navegación por pestañas.

/**
 * Componente Entrada
 * Este componente actúa como un contenedor para la página de "Entradas".
 * Administra el estado de carga y renderiza el contenido correspondiente
 * según el estado actual.
 */
export function Registro() {
  const [loading, setLoading] = useState(false); 
  // Variable de estado `loading` para manejar el estado de carga.

  /**
   * Función simulateLoading
   * Esta función simula un efecto de carga activando el estado de carga (`loading`)
   * y luego desactivándolo después de un tiempo especificado.
   */
  function Simularcarga() {
    setLoading(true); // Activa el estado de carga.
    setTimeout(() => {
      setLoading(false); // Desactiva el estado de carga después de 1 segundo.
    }, 1000); // Tiempo de simulación ajustable (1 segundo en este caso).
  }

  return (
    <div>
      {/* Componente Tabs que recibe los elementos de navegación y una función para simular la carga */}
      <Tabs 
        itemsNav={ItemsNav[0]} // Pasa el primer elemento de navegación como prop.
        nameTitle={'pacientes'} // Título de la pestaña.
        simulateLoading={() => { Simularcarga() }} 
        // Pasa la función simulateLoading como prop para que pueda ser llamada desde Tabs.
      />          

      {/* Renderizado condicional basado en el estado de carga */}
      {loading ? (
        // Si `loading` es verdadero, muestra el componente Loader.
        <div className="flex items-center justify-center pt-28">
          <Loader /> {/* Componente Loader que muestra un indicador de carga. */}
        </div>
      ) : (
        // Si `loading` es falso, renderiza las rutas anidadas.
        <div className='flex flex-row justify-center'>
          <Outlet /> {/* Renderiza las rutas anidadas definidas en React Router. */}
        </div>
      )}
    </div>
  );
}