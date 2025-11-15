import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// This is the URL of our running backend server.
const API_URL = process.env.REACT_APP_API_URL;

// We receive the 'isOpen' prop from our parent (App.js)
const Sidebar = ({ isOpen }) => {
  // Holds the list of chat sessions (e.g., [{id: 's1', title: '...'}])
  const [sessions, setSessions] = useState([]);
  
  // Hook from React Router to programmatically change pages
  const navigate = useNavigate();

  // Fetches the list of sessions from the backend
  const fetchSessions = async () => {
    try {
      const response = await fetch(`${API_URL}/api/sessions`);
      const data = await response.json();
      setSessions(data); // Store the list in our state
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  // Fetch sessions once when the component mounts
  useEffect(() => {
    fetchSessions();
  }, []);

  // Called when the "+ New Chat" button is clicked
  const handleNewChat = async () => {
    try {
      // 1. Ask the backend to create a new session
      const response = await fetch(`${API_URL}/api/new-chat`);
      const newSession = await response.json();
      
      // 2. Add this new session to the top of the local state
      setSessions(prevSessions => [newSession, ...prevSessions]);
      
      // 3. Navigate to the new chat's page
      navigate(`/chat/${newSession.id}`);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  return (
    // Main container that handles the open/close animation (width, padding)
    <div className={`
      bg-gray-100 
      dark:bg-gray-800 
      text-black 
      dark:text-white 
      flex 
      flex-col 
      flex-shrink-0
      transition-all duration-300 ease-in-out
      ${isOpen ? 'w-64 p-4' : 'w-0 p-0'}
    `}>
      
      {/* Inner wrapper for content, handles fading and layout (flex-col, h-full) */}
      <div className={`
        flex flex-col h-full 
        overflow-hidden whitespace-nowrap
        transition-opacity duration-300
        ${isOpen ? 'opacity-100' : 'opacity-0'}
      `}>

        {/* New Chat Button */}
        <button
          onClick={handleNewChat}
          className="w-full py-2 px-4 mb-4 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          + New Chat
        </button>

        {/* Session History List
            'flex-1' makes this list grow to fill available space
        */}
        <div className="flex-1 overflow-y-auto">
          {sessions.length > 0 ? (
            // Map over sessions and create a link for each
            sessions.map(session => (
              <Link
                key={session.id}
                to={`/chat/${session.id}`} // Sets the URL, e.g., /chat/s1
                className="block py-2 px-3 rounded-lg truncate hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {session.title}
              </Link>
            ))
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No sessions yet...
            </p>
          )}
        </div>

        {/* User Info
            'mt-auto' pushes this block to the bottom of the flex container
        */}
        <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-600">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center font-bold">
              U
            </div>
            <p className="font-medium">User</p>
          </div>
        </div>
      
      </div> {/* End of inner wrapper */}
    </div>
  );
};

export default Sidebar;
