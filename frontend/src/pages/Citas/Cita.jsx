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

export function Cita() {
  const [loading, setLoading] = useState(false); 


  function simulateLoading() {
    setLoading(true); 
    setTimeout(() => {
      setLoading(false); 
    }, 1000); 
  }

  return (
    
    <div>
      <Tabs 
        itemsNav={ItemsNav[1]} 
        nameTitle={'citas'} 
        simulateLoading={() => { simulateLoading() }} 

      />          
      {loading ? (
        <div className="flex items-center justify-center pt-28">
          <Loader /> 
        </div>
      ) : (
        <div className='flex flex-row justify-center'>
          <Outlet /> 
        </div>   
      )}
    </div>
    
  );
}