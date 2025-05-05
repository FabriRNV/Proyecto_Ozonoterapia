import { NavLink } from "react-router-dom";
// Importa el componente `NavLink` de React Router para manejar la navegación entre rutas.

/**
 * El componente `Tabs` es un componente funcional de React que recibe cuatro props:
 * 1. `objetoLink`: La ruta URL a la que `NavLink` redirigirá cuando se haga clic.
 * 2. `simularCarga`: Una función que se ejecutará cuando se haga clic en el `NavLink` (por ejemplo, para simular un estado de carga).
 * 3. `iconoObjeto`: Un ícono o elemento visual que se mostrará antes del nombre del elemento en la pestaña.
 * 4. `nombreObjeto`: El nombre o etiqueta de la pestaña que se mostrará en la interfaz de usuario.
 */
const Tabs = ({itemLink, simulateLoading, itemIcon, itemName}) => {
  return (
    // Cada pestaña se renderiza como un elemento de lista <li> con un margen derecho para el espaciado.
    <li className="mr-2">
      {/* `NavLink` se utiliza para la navegación entre rutas. 
          Aplica automáticamente una clase "active" cuando la ruta coincide con la ruta actual. */}
      <NavLink 
        to={itemLink}
        className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-primario hover:border-primario group"
        onClick={simulateLoading}
      >
        <p className='mr-2 bg-primario text-cuarto rounded-full p-1'>{itemIcon}</p>
        <p className='text-primario font-semibold'>{itemName}</p>
      </NavLink>

    </li>
  );
};

export default Tabs;
// Exporta el componente `Tabs` para que pueda ser utilizado en otros archivos.