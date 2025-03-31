import { NavLink } from "react-router-dom"

// The Tabs component is a functional React component that receives four props:
// 1. itemLink: The URL route that NavLink will redirect to when clicked.
// 2. simulateLoading: A function to be executed when the NavLink is clicked (for example, simulating a loading state).
// 3. itemIcon: An icon or visual element to be displayed before the item name in the tab.
// 4. itemName: The name or label for the tab that is displayed in the UI.

const Tabs = ({itemLink, simulateLoading, itemIcon, itemName}) => {
  return (
    // Each tab is rendered as a list item <li> with some margin-right styling applied for spacing.
    <li className="mr-2">
      {/* NavLink is used for navigation between routes. It automatically applies 
          an "active" class when the route matches the current path. */}
      <NavLink 
        to={itemLink} // The "to" prop defines the route for this particular tab.
        className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-orange-400 hover:border-orange-400 group"
        // The onClick event triggers the simulateLoading function, which could be used to simulate loading states or other side effects.
        onClick={simulateLoading}
      >
        {/* The icon is displayed to the left of the item name. 
            The text color changes on hover, using Tailwind CSS classes. */}
        <p className='mr-2 text-gray-400 group-hover:text-orange-400'>{itemIcon}</p>
        
        {/* The tab name is displayed as plain text next to the icon. */}
        <p>{itemName}</p>
      </NavLink>
    </li>
  )
}

export default Tabs

/*
Possible Improvements:
1. **Accessibility**: Consider adding an `aria-label` to the NavLink for screen readers, especially if the icon is not self-explanatory.
2. **Loading State Feedback**: Simulate loading can be enhanced by visually indicating the loading state to the user (e.g., by showing a spinner or disabling the NavLink during the load).
3. **Performance Optimization**: If `simulateLoading` triggers any heavy operations, debouncing or throttling might be useful to prevent multiple clicks causing performance issues.
4. **Prop Validation**: You could add prop types validation using PropTypes to ensure that the props passed into `Tabs` have the correct types (e.g., `itemLink` should be a string, `simulateLoading` a function, etc.).
*/
