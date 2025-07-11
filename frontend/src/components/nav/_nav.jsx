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
    name: "Pacientes",
    // The route associated with this category.
    to: "pacientes",
    // Icon representing the category.
    icon: <MdGroupAdd />,
    // Items that fall under this category.
    items: [
      {
        name: "Historial Pacientes", // Sub-item name.
        to: "historial", // Route for the sub-item.
        icon: <MdSupervisedUserCircle className='w-4 h-4'/> // Sub-item icon.
      },
      {
        name: "Agregar Paciente",
        to: "nuevoPaciente",
        icon: <MdHistoryEdu className='w-4 h-4'/>
      },
    ],
  },
  {
    name: "Doctores",
    icon: <MdGroupAdd />,
    to: "doctores",
    items: [
      {
        name: "Lista Doctores",
        to: "listaDoctores",
        icon: <MdSupervisedUserCircle className='w-4 h-4'/>
      },
      {
        name: "Agregar Doctor",
        to: "nuevoDoctor",
        icon: <MdHistoryEdu className='w-4 h-4'/>
      },
    ],
  },
  {
    name: "Citas Médicas",
    icon: <MdAssignmentAdd />,
    to: "citas",
    items: [
      {
        name: "Lista Citas",
        to: "listaCitas",
        icon: <MdViewList className='w-4 h-4'/>
      },
      {
        name: "Agregar Cita",
        to: "nuevaCita",
        icon: <MdAssignmentTurnedIn className='w-4 h-4'/>
      },
      {
        name: "Calendario Citas",
        to: "calendario",
        icon: <MdAssignmentTurnedIn className='w-4 h-4'/>
      },
    ],
  },
  {
    name: "Tratamientos",
    icon: <MdAssignmentTurnedIn />,
    to: "tratamientos",
    items: [
      {
        name: "Listar tratamientos",
        to: "listaTratamientos",
        icon: <MdViewList className='w-4 h-4'/>
      },
      {
        name: "Agregar tratamiento",
        to: "nuevoTratamiento",
        icon: <MdAssignmentTurnedIn className='w-4 h-4'/>
      },
    ],
  },
]

