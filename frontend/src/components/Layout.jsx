import { useState } from 'react'; 
// Importa `useState` de React para manejar el estado del componente.

import { RiMenuUnfoldFill, RiCloseFill } from "react-icons/ri";
// Importa íconos de `react-icons` para usarlos en el botón de menú.

import { Sidebar } from './Sidebar/Sidebar';
// Importa el componente `Sidebar`, que representa la barra lateral.

import { Header } from './nav/Header';
// Importa el componente `Header`, que representa la barra de navegación superior.

import { Outlet } from 'react-router-dom';
// Importa `Outlet` de React Router para renderizar rutas anidadas.

export function Layout() {
  // Define el componente `Layout`, que actúa como el diseño principal de la aplicación.

  // Estado para controlar la visibilidad del menú lateral en pantallas pequeñas.
  const [showMenu, setShowMenu] = useState(false);

  // Estado para manejar si la barra lateral está colapsada o expandida.
  const [open, setOpen] = useState(true);

  // Función para alternar la visibilidad del menú lateral.
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  // Función para alternar el estado colapsado/expandido de la barra lateral.
  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    // Contenedor principal del diseño.
    <div
      className="min-h-screen bg-cover bg-center text-white bg-quinto"
    >
      {/* Componente Sidebar */}
      {/* Recibe las props `showMenu`, `collapsed` y `setCollapsed` para manejar su estado. */}
      <Sidebar showMenu={showMenu} collapsed={open} setCollapsed={toggleOpen} />

      {/* Botón para alternar la visibilidad del menú lateral en pantallas pequeñas */}
      <button
        onClick={toggleMenu}
        className="xl:hidden fixed bottom-6 right-6 bg-slate-500 p-4 rounded-full"
      >
        {/* Cambia el ícono dependiendo del estado de `showMenu` */}
        {showMenu ? <RiCloseFill /> : <RiMenuUnfoldFill />}
      </button>

      {/* Componente Header */}
      {/* Recibe la prop `collapsed` para ajustar su diseño según el estado de la barra lateral. */}
      <Header collapsed={open} />

      {/* Área principal de contenido */}
      <div className="pt-36 md:pt-24 xl:pt-20">
        {/* Ajusta el padding izquierdo según el estado de la barra lateral */}
        <div className={`${open ? "lg:pl-72" : "lg:pl-28"} duration-300`}>
          {/* Renderiza las rutas anidadas */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}