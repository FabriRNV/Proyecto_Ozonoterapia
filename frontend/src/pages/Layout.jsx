import { useState } from 'react'
import { RiMenuUnfoldFill, RiCloseFill } from "react-icons/ri";
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Header } from '../components/nav/Header';
import { Outlet } from 'react-router-dom';

export function Layout() {
  // State variable to control the visibility of the sidebar menu
  const [showMenu, setShowMenu] = useState(false)

  // State variable to manage the collapsed state of the sidebar
  const [open, setOpen] = useState(true)

  // Function to toggle the sidebar menu visibility
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  // Function to toggle the collapsed state of the sidebar
  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-black  from-80% to-secondaryColor  text-white'>
      {/* Sidebar component that takes in props to control visibility and collapsed state */}
      <Sidebar showMenu={showMenu} collapsed={open} setCollapsed={toggleOpen} />

      {/* Button to toggle the sidebar menu visibility on smaller screens */}
      <button onClick={toggleMenu} className="xl:hidden fixed bottom-6 right-6 bg-slate-500 p-4 rounded-full">
        {showMenu ? <RiCloseFill /> : <RiMenuUnfoldFill />}
      </button>

      {/* Header component that takes in the collapsed state as a prop */}
      <Header collapsed={open} />

      {/* Main content area */}
      <div className='pt-36 md:pt-24 xl:pt-20'>
        <div className={`${open ? "lg:pl-72" : "lg:pl-28"} duration-300`}>
          {/* Outlet for rendering nested routes */}
          <Outlet />
        </div>
      </div>
    </div>
  )
}
