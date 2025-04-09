import { NavLink } from "react-router-dom";
// Importa el componente `NavLink` de React Router para manejar la navegación entre rutas.

/**
 * El componente `Tabs` es un componente funcional de React que recibe cuatro props:
 * 1. `objetoLink`: La ruta URL a la que `NavLink` redirigirá cuando se haga clic.
 * 2. `simularCarga`: Una función que se ejecutará cuando se haga clic en el `NavLink` (por ejemplo, para simular un estado de carga).
 * 3. `iconoObjeto`: Un ícono o elemento visual que se mostrará antes del nombre del elemento en la pestaña.
 * 4. `nombreObjeto`: El nombre o etiqueta de la pestaña que se mostrará en la interfaz de usuario.
 */
const Tabs = ({ objetoLink, simularCarga, iconoObjeto, nombreObjeto }) => {
  return (
    // Cada pestaña se renderiza como un elemento de lista <li> con un margen derecho para el espaciado.
    <li className="mr-2">
      {/* `NavLink` se utiliza para la navegación entre rutas. 
          Aplica automáticamente una clase "active" cuando la ruta coincide con la ruta actual. */}
      <NavLink 
        to={objetoLink} // La prop `to` define la ruta para esta pestaña en particular.
        className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-orange-400 hover:border-orange-400 group"
        // El evento `onClick` activa la función `simularCarga`, que podría usarse para simular estados de carga u otros efectos secundarios.
        onClick={simularCarga}
      >
        {/* El ícono se muestra a la izquierda del nombre del elemento. 
            El color del texto cambia al pasar el cursor, utilizando clases de Tailwind CSS. */}
        <p className='mr-2 text-gray-400 group-hover:text-orange-400'>{iconoObjeto}</p>
        
        {/* El nombre de la pestaña se muestra como texto simple junto al ícono. */}
        <p>{nombreObjeto}</p>
      </NavLink>
    </li>
  );
};

export default Tabs;
// Exporta el componente `Tabs` para que pueda ser utilizado en otros archivos.