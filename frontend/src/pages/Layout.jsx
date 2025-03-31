import React from 'react';
// Importa íconos de Ant Design que se usarán en el menú lateral.
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
// Importa componentes de diseño de Ant Design como Layout, Menu, Breadcrumb y tema.
import { Breadcrumb, Layout, Menu, theme } from 'antd';
// Importa el componente personalizado 'Header'.
import { Header } from '../components/nav/Header';

// Desestructura los componentes 'Content' y 'Sider' del objeto 'Layout' de Ant Design.
const { Content, Sider } = Layout;

// Define los elementos del menú superior (pueden ser enlaces de navegación).
const items1 = ['1', '2', '3'].map((key) => ({
  key, // Clave única para cada elemento.
  label: `nav ${key}`, // Etiqueta que se mostrará en el menú.
}));

// Define los elementos del menú lateral con submenús.
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1); // Genera una clave única para cada submenú.
  return {
    key: `sub${key}`, // Clave del submenú.
    icon: React.createElement(icon), // Ícono asociado al submenú.
    label: `subnav ${key}`, // Etiqueta del submenú.
    children: Array.from({ length: 4 }).map((_, j) => {
      const subKey = index * 4 + j + 1; // Genera claves únicas para los elementos hijos.
      return {
        key: subKey, // Clave del elemento hijo.
        label: `option${subKey}`, // Etiqueta del elemento hijo.
      };
    }),
  };
});

// Componente principal de la página.
const App = () => {
  // Usa el tema de Ant Design para obtener colores y estilos personalizados.
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      {/* Componente de encabezado personalizado */}
      <Header></Header>
      <Layout>
        {/* Barra lateral (Sider) */}
        <Sider
          width={200} // Ancho de la barra lateral.
          style={{
            background: colorBgContainer, // Color de fondo obtenido del tema.
          }}
        >
          {/* Menú lateral */}
          <Menu
            mode="inline" // Modo de menú en línea.
            defaultSelectedKeys={['1']} // Elemento seleccionado por defecto.
            defaultOpenKeys={['sub1']} // Submenú abierto por defecto.
            style={{
              height: '100%', // Altura completa.
              borderRight: 0, // Sin borde derecho.
            }}
            items={items2} // Elementos del menú.
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px', // Espaciado interno.
          }}
        >
          {/* Breadcrumb (navegación jerárquica) */}
          <Breadcrumb
            items={[
              { title: 'Home' }, // Primer nivel.
              { title: 'List' }, // Segundo nivel.
              { title: 'App' }, // Tercer nivel.
            ]}
            style={{
              margin: '16px 0', // Margen superior e inferior.
            }}
          />
          {/* Contenido principal */}
          <Content
            style={{
              padding: 24, // Espaciado interno.
              margin: 0, // Sin margen externo.
              minHeight: 280, // Altura mínima.
              background: colorBgContainer, // Color de fondo obtenido del tema.
              borderRadius: borderRadiusLG, // Bordes redondeados obtenidos del tema.
            }}
          >
            Content {/* Aquí iría el contenido dinámico de la página. */}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App; // Exporta el componente para que pueda ser usado en otros archivos.