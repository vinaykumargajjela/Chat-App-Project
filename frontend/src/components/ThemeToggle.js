import React, { useState, useEffect } from 'react';

// We can import icons from a popular library like 'react-icons'
// If you want to use these, run: npm install react-icons
// For now, we'll use simple emojis ☀️/🌙
// import { FaSun, FaMoon } from 'react-icons/fa';

/*
 * =======================================================================
 * THEME TOGGLE COMPONENT
 * =======================================================================
 *
 * This component manages the light/dark mode for the entire application.
 * It uses React's `useState` and `useEffect` hooks to achieve this.
 */
const ThemeToggle = () => {
  /*
   * `useState` is a React Hook that lets us add a "state variable"
   * to our component.
   *
   * - `theme`: This is our state variable. It will hold the
   * current theme ('light' or 'dark').
   *
   * - `setTheme`: This is the *only* function we use to update
   * the 'theme' variable.
   *
   * We are initializing its value by checking the user's
   * browser preference (`window.matchMedia`). This is a nice
   * "humanized" touch.
   */
  const [theme, setTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  /*
   * `useEffect` is a React Hook that lets us perform "side effects".
   * A "side effect" is anything that happens *outside* of React,
   * like:
   * - Fetching data from an API
   * - Manually changing the HTML (which we do here!)
   *
   * This function will run *every time* our `theme` variable changes.
   * The `[theme]` at the end is the "dependency array".
   */
  useEffect(() => {
    // 1. Get the main <html> element
    const root = document.documentElement;

    // 2. Check our 'theme' state variable
    if (theme === 'dark') {
      // If it's 'dark', add the 'dark' class to the <html> tag.
      // Tailwind's 'darkMode: "class"' config will see this
      // and apply all our 'dark:...' styles.
      root.classList.add('dark');
    } else {
      // If it's 'light', *remove* the 'dark' class.
      root.classList.remove('dark');
    }
    
    // We only want this effect to re-run when the 'theme' variable changes.
  }, [theme]);

  // This function is called when the button is clicked.
  const handleToggle = () => {
    // We use a "ternary operator" to flip the theme.
    // "If theme is 'dark', set it to 'light', otherwise set it to 'dark'."
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleToggle} // We hook up our function here
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-lg"
    >
      {/* This is a simple way to show the correct icon */}
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;