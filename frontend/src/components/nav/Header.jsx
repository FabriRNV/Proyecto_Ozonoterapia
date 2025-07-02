import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react'
import {
  RiSearchLine,
  RiQuestionAnswerLine,
  RiNotification2Line,
  RiArrowDownSLine,
  RiCheckboxBlankCircleFill,
  RiMailSendLine,
  RiSettings5Line,
  RiLogoutBoxRLine 
} from "react-icons/ri";

// The Header component is responsible for rendering a top navigation bar with various interactive elements such as a search bar, notifications, messages, and user profile options.
// It accepts a `collapsed` prop to dynamically adjust its width based on whether the sidebar is collapsed or expanded.

export function Header({ collapsed }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    let storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      // Compatibilidad con versiones anteriores
      const userObj = localStorage.getItem('user');
      if (userObj) {
        try {
          storedUsername = JSON.parse(userObj).username;
        } catch {}
      }
    }
    if (storedUsername) setUsername(storedUsername);
  }, []);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('access_token'); // Por si acaso
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };
  return (
    // The header is positioned at the top of the screen (`fixed`), ensuring it remains visible while scrolling.
    // It dynamically adjusts its width depending on the `collapsed` prop to accommodate the sidebar's state.
    <header className={`fixed z-20 bg-gradient-to-br from-secundario from-5% to-terciario w-full ${collapsed ? "xl:ml-64 xl:w-[calc(100%-254px)]" : "xl:ml-20 xl:w-[calc(100%-74px)]"} text-white duration-300 flex flex-col md:flex-row items-center justify-between gap-4 p-4`}>
      
      {/* Search bar */}
      {/* The form contains a search input, styled with a placeholder text and an icon positioned on the left side */}
      <form className='order-1 md:order-none'>
        <div className='relative'>
          <RiSearchLine className='text-primario absolute left-4 top-1/2 -translate-y-1/2' />
          <input type="text" placeholder='Buscar' className='text-primario bg-quinto outline-1 py-2 pl-10 pr-20 rounded-md text-lg w-full' />
        </div>
      </form>

      {/* Navigation section with icons for messages, notifications, and user profile */}
      <nav className='flex items-center gap-2 text-lg'>

        {/* User Profile Dropdown */}
        <Menu as="div">
          <Menu.Button  className='flex items-center gap-4 py-2 px-8 hover:bg-secundario hover:text-cuarto p-2 rounded-full transition-colors'>
            <img src="../src/assets/img/freepik__icono_de_un_nuevo_usuario_en_un_sistema_de_me.png" className='w-8 h-8 object-cover rounded-full ring-2'/>
            <span >{username || "Usuario"}</span>
            <RiArrowDownSLine />
          </Menu.Button>

          {/* Transition for profile dropdown */}
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            {/* Profile dropdown content */}
            <Menu.Items as="section" className="absolute top-6 right-0 bg-secundario w-72 rounded-lg shadow-lg p-4">
              <div>
                <h1 className='font-bold text-center'>Opciones</h1>
                <hr className='my-2' />
                {/* Account management and logout options 
                <Menu.Item>
                  <a href='#' className='flex items-center gap-4 rounded-lg hover:bg-terciario text-cuarto transition-color'>
                    <RiSettings5Line />
                    <div>
                      <h5>Administrar cuenta</h5>
                    </div>
                  </a>
                </Menu.Item>*/}
                <Menu.Item>
                  <a href='#' onClick={handleLogout} className='flex items-center gap-4 rounded-lg hover:bg-terciario text-cuarto transition-color'>
                    <RiLogoutBoxRLine />
                    <div>
                      <h5>Salir</h5>
                    </div>
                  </a>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </nav>
    </header>
  )
}
