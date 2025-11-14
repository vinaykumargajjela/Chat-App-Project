/** @type {import('tailwindcss').Config} */
module.exports = {
  // This line enables dark mode, which we'll use for the theme toggle.
  // 'class' means we will control it by adding/removing a 'dark' class
  // to the main HTML element.
  darkMode: 'class',
  
  // This 'content' array tells Tailwind where your files are.
  // It will scan all .js and .jsx files inside your 'src' folder
  // and all its subfolders. This is the most important part.
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}