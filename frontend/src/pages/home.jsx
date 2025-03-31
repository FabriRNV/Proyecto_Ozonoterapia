import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Clínica XYZ</h1>
            <nav>
                <ul>
                    <li><Link to="/appointments" className='bg-amber-300'>Citas</Link></li>
                    <li><Link to="/doctors">Doctores</Link></li>
                    <li><Link to="/patients">Pacientes</Link></li>
                    <li><Link to="/services">Servicios</Link></li>
                    <li><Link to="/contact">Contacto</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;