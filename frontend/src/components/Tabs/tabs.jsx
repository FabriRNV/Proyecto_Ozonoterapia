import Tabs from './lista';
// Importa el componente `Tabs` desde el archivo `list.jsx`.

/**
 * Este componente funcional `tabs` recibe tres props:
 * 1. `simulateLoading`: Una función o variable que simula el estado de carga del contenido de la pestaña.
 * 2. `nameTitle`: Un string que se utiliza para mostrar el título de la sección de pestañas.
 * 3. `itemsNav`: Un objeto que contiene un array `items`, donde cada elemento representa una pestaña con atributos como `to`, `icon` y `name`.
 */
const tabs = ({ simularCarga, nombreTitulo, objetosNav }) => {
  return (
    // Contenedor principal que alinea verticalmente el contenido en el centro y ajusta el diseño según el tamaño de la pantalla.
    <div className="flex flex-col items-center justify-center text-sm font-medium text-center text-fourthColor lg:justify-between lg:flex-row mb-3">
      
      {/* Título mostrado en el lado izquierdo, en mayúsculas y con fuente en negrita para énfasis */}
      <h1 className='uppercase text-xl font-bold pl-2'>{nombreTitulo}</h1>
      
      {/* Lista de elementos de navegación (pestañas) mostrados como un flexbox, alineados a la derecha en pantallas grandes */}
      <ul className="flex flex-wrap -mb-px justify-end lg:order-last">
        {
          // Mapea sobre el array `items` de `itemsNav` para renderizar dinámicamente cada pestaña.
          // El componente `Tabs` se renderiza para cada elemento con propiedades específicas como título, enlace, ícono y nombre.
          objetosNav.objetos.map((objeto, index) => 
            <Tabs 
              titleName={"Code"}     // Título estático pasado a cada pestaña, podría ser dinámico según el caso de uso.
              key={index}            // Cada pestaña recibe una clave única basada en su índice en el array.
              itemLink={objeto.to}      // URL o ruta asociada con esta pestaña.
              iconoObjeto={objeto.icono}    // Ícono relacionado con la pestaña, mejora la identificación visual.
              nombreObjeto={objeto.nombre}    // El nombre/etiqueta de la pestaña mostrado al usuario.
              simularcarga={simularCarga}  // Simula el estado de carga cuando se hace clic en la pestaña.
            />
          )
        }
      </ul>
    </div>
  )
}

export default tabs;
// Exporta el componente `tabs` para que pueda ser utilizado en otros archivos.