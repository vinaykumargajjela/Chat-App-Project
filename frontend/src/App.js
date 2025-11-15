import React, { useState } from 'react'; // Import useState
import { Routes, Route } from 'react-router-dom';

// Import components
import Sidebar from './components/Sidebar';
import ThemeToggle from './components/ThemeToggle';
import LandingPage from './components/LandingPage';
import ChatWindow from './components/ChatWindow';

function App() {
  // State for managing the sidebar's open/closed status
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    // Main app container
    <div className="flex h-screen bg-white dark:bg-gray-900 text-black dark:text-white">
      
      {/* 1. SIDEBAR */}
      {/* Pass the state down to the Sidebar component as a prop */}
      <Sidebar isOpen={isSidebarOpen} />
      
      {/* 2. MAIN CONTENT AREA (Wrapper) */}
      {/* 'relative' allows absolute positioning of the toggle button */}
      <div className="flex-1 flex flex-col relative">
      
        {/* --- SIDEBAR TOGGLE BUTTON --- */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Flips the sidebar state
          className="
            absolute top-1/2 -left-3 z-10 
            transform -translate-y-1/2
            p-1 
            bg-gray-200 dark:bg-gray-700 
            rounded-full 
            shadow-md 
            hover:bg-gray-300 dark:hover:bg-gray-600
            transition-all
          "
          aria-label="Toggle sidebar"
        >
          {/* SVG icon rotates based on sidebar state */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={2} 
            stroke="currentColor" 
            className={`
              w-5 h-5 
              transition-transform duration-300 
              ${isSidebarOpen ? '' : 'rotate-180'}
            `}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>
        
        {/* 2a. Top Bar */}
        <header className="flex justify-end p-4 border-b border-gray-200 dark:border-gray-700">
          <ThemeToggle />
        </header>
        
        {/* 2b. Page Content (routed) */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat/:sessionId" element={<ChatWindow />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;