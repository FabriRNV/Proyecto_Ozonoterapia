import React from 'react'
import {  
  MdAssignmentAdd, MdSupervisedUserCircle, MdGroupAdd,
  MdRingVolume, MdAssignmentTurnedIn, MdUpdate, 
  MdViewList, MdHistoryEdu, MdAddchart, MdBallot, 
  MdBorderColor, MdAirportShuttle   
} from "react-icons/md"

// The ItemsNav array holds the navigation items for the application.
// Each object within the array represents a main category in the navigation.
export const ItemsNav = [  
  {
    // Name of the first category.
    name: "Entrada de Material",
    // The route associated with this category.
    to: "entradas",
    // Icon representing the category.
    icon: <MdAssignmentAdd />,
    // Items that fall under this category.
    items: [
      {
        name: "Listar Entradas", // Sub-item name.
        to: "listaEntrada", // Route for the sub-item.
        icon: <MdSupervisedUserCircle className='w-4 h-4'/> // Sub-item icon.
      },
      {
        name: "Agregar Entrada",
        to: "nuevaEntrada",
        icon: <MdHistoryEdu className='w-4 h-4'/>
      },
    ],
  },
  {
    name: "Salida de Material",
    icon: <MdAssignmentTurnedIn />,
    to: "salidas",
    items: [
      {
        name: "Listar Salidas",
        to: "listaSalida",
        icon: <MdViewList className='w-4 h-4'/>
      },
      {
        name: "Agregar Salida",
        to: "nuevaSalida",
        icon: <MdAssignmentTurnedIn className='w-4 h-4'/>
      },
    ],
  },
  {
    name: "Productos",
    icon: <MdAddchart />,
    to: "productos",
    items: [
      {
        name: "Lista de productos",
        to: "listaProducto",
        icon: <MdBallot className='w-4 h-4'/>,
      },
      {
        name: "Añadir producto",
        to: "nuevoProducto",
        icon: <MdBorderColor className='w-4 h-4'/>,
      },
    ]
  },
  {
    name: "Proveedores",
    icon: <MdAirportShuttle />,
    to: "proveedores",
    items: [
      {
        name: "Lista de proveedores",
        to: "listaProveedor",
        icon: <MdBallot className='w-4 h-4'/>,
      },
      {
        name: "Añadir proveedor",
        to: "nuevoProveedor",
        icon: <MdBorderColor className='w-4 h-4'/>,
      },
    ]
  },
]

// Possible Improvements:
// 1. **TypeScript Integration:** Consider using TypeScript for type safety, especially for the structure of ItemsNav, enhancing code clarity and reducing runtime errors.
// 2. **Dynamic Routing:** If the routing is defined in a separate file, you could import routes directly to avoid hardcoding paths.
// 3. **Icon Optimization:** Store icons in a separate file to improve readability and maintainability, especially if icon usage expands.
// 4. **Localization Support:** If your application targets multiple languages, implementing localization could improve user experience.
// 5. **Accessibility Enhancements:** Consider adding aria-labels or roles to improve accessibility for users with disabilities.
