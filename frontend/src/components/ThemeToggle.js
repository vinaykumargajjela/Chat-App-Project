import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  // Initialize theme based on the user's OS preference
  const [theme, setTheme] = useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  // This effect runs when the 'theme' state changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Toggles the 'dark' class on the <html> element
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]); // Re-run only if 'theme' changes

  // Flips the theme state between 'light' and 'dark'
  const handleToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  return (
    <button
      onClick={handleToggle}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-lg"
    >
      {/* Show the appropriate emoji based on the current theme */}
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;