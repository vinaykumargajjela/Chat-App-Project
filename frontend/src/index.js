import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This has our Tailwind styles
import App from './App';

// 1. Import BrowserRouter
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/*
      2. Wrap the <App /> component with <BrowserRouter>.
         This "activates" routing for our entire application.
    */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);