import { ItemsNav } from '../_nav'; // Importing the navigation items data
import { NavLink } from 'react-router-dom'; // Importing the NavLink component to handle navigation
import { RiMenu2Line } from "react-icons/ri"; // Importing the Menu icon from react-icons
import LogoCoder from '../../assets/img/logo_coder.png'; // Importing the logo image

// Sidebar component, which takes in 'showMenu', 'collapsed', and 'setCollapsed' as props
export function Sidebar({ showMenu, collapsed, setCollapsed }) {

  return (
    // The sidebar container: dynamically changes width and position based on 'collapsed' and 'showMenu'
    <div className={`fixed top-0 w-2/4 xl:left-0 ${collapsed ? "lg:w-64" : "lg:w-20"} duration-300 h-full bg-gradient-to-tl from-prymaryColor from-40%  via-secondaryColor via-65% to-tertiaryColor p-4 flex flex-col justify-between z-30 transition-all ${showMenu ? "left-0" : "-left-full"}`}>
    
    {/* The upper section of the sidebar containing the logo and menu button */}
    <div className='text-fourthColor '>
      
      {/* Header of the sidebar, including the logo and the collapse/expand button */}
      <h1 className={`text-4xl font-bold mb-3 ${collapsed ? "flex items-center justify-between":"flex-col justify-center items-center"}`}>
        
        {/* Logo section: If 'collapsed' is false, logo is centered */}
        <div className={`flex gap-2 items-center ${!collapsed && "flex justify-center"}`}>
          <img src={LogoCoder} className='w-32' /> {/* Displaying the logo */}
        </div>
        
        {/* Menu button to collapse/expand the sidebar */}
        <div className={`${!collapsed && "flex justify-center mt-4"}`}>
          <button className='text-xl flex' onClick={setCollapsed}>
            <RiMenu2Line/> {/* Menu icon */}
          </button>
        </div>
      </h1>
      
      {/* Navigation section */}
      <ul>
        {/* Mapping through ItemsNav array to render the navigation links */}
        {ItemsNav.map((item, index) => (
          <li
            key={index}
            className="hover:bg-tertiaryColor transition-color py-2 px-2 rounded-lg text-fourthColor"
          >
            {/* NavLink component, which adds active class styling when the link is active */}
            <NavLink to={item.to} 
              className={({isActive})=> isActive ? `bg-myDeadBlue boreder p-1 ${collapsed ? "h-10":"h-fit p-2"} rounded-md flex items-center gap-4` : "flex items-center gap-4"}>
              
              {/* Icon and name of the navigation item */}
              <span className='text-xl'>{item.icon}</span>
              <span className={`${!collapsed && "hidden"}`}>{item.name}</span> {/* Hide the name when collapsed */}
            </NavLink>

            {/* No nested list rendering even if the item has sub-items */}
            {/* Comment here hints at future functionality to handle nested navigation */}
          </li>
        ))}
      </ul>
    </div>
  </div>
  )
}
