import React from 'react';
// Importa el componente `Link` de `react-router-dom` para crear enlaces de navegación internos.
import { Link } from 'react-router-dom';

// Define el componente funcional `Home`.
const Home = () => {
    return (
        <div>
            {/* Título principal de la página */}
            <h1>Clínica XYZ</h1>
            
            {/* Sección de navegación */}
            <nav>
                <ul>
                    {/* Cada elemento de la lista contiene un enlace interno que utiliza `Link` para navegar entre rutas */}
                    <li>
                        {/* Enlace a la página de citas con una clase de Tailwind CSS para estilizar */}
                        <Link to="/appointments" className='bg-amber-300'>Citas</Link>
                    </li>
                    <li>
                        {/* Enlace a la página de doctores */}
                        <Link to="/doctors">Doctores</Link>
                    </li>
                    <li>
                        {/* Enlace a la página de pacientes */}
                        <Link to="/patients">Pacientes</Link>
                    </li>
                    <li>
                        {/* Enlace a la página de servicios */}
                        <Link to="/services">Servicios</Link>
                    </li>
                    <li>
                        {/* Enlace a la página de contacto */}
                        <Link to="/contact">Contacto</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

// Exporta el componente `Home` para que pueda ser utilizado en otros archivos.
export default Home;