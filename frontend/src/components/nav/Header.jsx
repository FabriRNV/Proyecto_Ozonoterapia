// Importa íconos de Ant Design que se usarán en el menú de navegación.
import { HomeTwoTone, EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
// Importa el componente `Menu` de Ant Design para crear un menú de navegación.
import { Menu } from 'antd';
// Importa el hook `useState` de React para manejar el estado del componente.
import { useState } from 'react';
// Importa `Outlet` y `Link` de `react-router-dom` para manejar la navegación interna.
import { Outlet, Link } from 'react-router-dom';

// Define el componente funcional `Header`.
export function Header() {
  // Estado `current` para rastrear el elemento seleccionado en el menú.
  const [current, setCurrent] = useState('h');

  // Función que se ejecuta al hacer clic en un elemento del menú.
  const onClick = (e) => {
    console.log('click ', e); // Muestra en la consola el evento del clic.
    setCurrent(e.key); // Actualiza el estado con la clave del elemento seleccionado.
  };

  return (
    <>
      {/* Menú de navegación horizontal con estilos personalizados */}
      <Menu
        onClick={onClick} // Maneja el evento de clic en los elementos del menú.
        selectedKeys={[current]} // Indica cuál elemento está seleccionado.
        mode="horizontal" // Configura el menú en modo horizontal.
        className="bg-gray-800 text-white" // Clases de Tailwind CSS para personalizar el fondo y el texto.
      >
        {/* Elemento del menú para la página de inicio */}
        <Menu.Item key="h" icon={<HomeTwoTone />} className="hover:bg-gray-700">
          {/* Enlace interno a la ruta "/" */}
          <Link to="/" className="text-white">Home</Link>
        </Menu.Item>

        {/* Elemento del menú para la página de registro */}
        <Menu.Item key="r" icon={<EditTwoTone />} className="hover:bg-gray-700">
          {/* Enlace interno a la ruta "/register" */}
          <Link to="/register" className="text-white">Register</Link>
        </Menu.Item>

        {/* Elemento del menú para la página de inicio de sesión */}
        <Menu.Item key="l" icon={<CheckCircleTwoTone />} className="hover:bg-gray-700">
          {/* Enlace interno a la ruta "/login" */}
          <Link to="/login" className="text-white">Login</Link>
        </Menu.Item>
      </Menu>

      {/* `Outlet` se utiliza para renderizar las rutas anidadas dentro del diseño del encabezado */}
      <Outlet />
    </>
  );
}

// Exporta el componente `Header` para que pueda ser utilizado en otros archivos.
export default Header;