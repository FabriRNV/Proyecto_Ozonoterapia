// This functional component named 'Card' is designed to create a styled container
// that can be reused throughout the application. It accepts two props: 
// 'children' and 'titulo'.
// 
// Props:
// - children: This prop allows for any nested elements or components to be rendered 
//   within the Card, providing flexibility for different use cases.
// - titulo: This prop is a string that represents the title of the Card, displayed
//   at the top of the component.
//
// The Card component has a maximum width of 5xl and features rounded corners,
// a shadow effect, and specific background colors defined by CSS classes.
// It ensures proper spacing on smaller screens by applying margin utilities.

export default function Card({ children, titulo }) {
  return (
    <div className="w-full max-w-6xl bg-secundario border-primario mx-6 md:mx-0 rounded-lg shadow-lg shadow-cuarto">
      <div className="rounded-sm p-2 bg-gradient-to-r from-primario from-5% via-tercero via-50% to-terciario text-cuarto text-2xl font-bold">
        {titulo}
      </div>
      {children}
    </div>
  );
}
