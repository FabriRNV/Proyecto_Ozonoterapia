// This is a simple reusable Button component that accepts children and additional props.
// The component returns a styled <button> element with some predefined Tailwind CSS classes.
// It also spreads any additional props provided to the button (such as onClick, type, etc.) 
// via the `...props` spread operator. The children prop is used to pass the button's content, 
// like text or icons.

// The classes applied include:
// - bg-orange-400: Sets the background color to orange.
// - text-white: Sets the text color to white.
// - font-bold: Makes the text bold.
// - py-2 and px-4: Sets padding (top/bottom and left/right).
// - rounded-lg: Rounds the button corners.
// - hover:bg-orange-500: Changes the background color on hover.
// - hover:shadow-lg: Adds a large shadow on hover.
// - hover:shadow-orange-500/50: Customizes the shadow color on hover.

export default function Button({ children, ...props }) {
  return (
    <button className="bg-tertiaryColor text-white font-bold py-2 px-4 rounded-sm hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/50" {...props}>
      {children}
    </button>
  );
}

// Possible improvements:
// 1. Add prop validation using PropTypes to ensure that the correct data types are passed (e.g., `children` should be a string or a node).
// 2. Make the button color customizable by adding a `color` prop, allowing for more flexibility in usage.
// 3. Improve accessibility by allowing more control over the button's ARIA attributes (e.g., `aria-label`).
// 4. Introduce a `loading` state, rendering a spinner or disabling the button when an async action is being processed.
