import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// This is the URL of our running backend server.
const API_URL = 'http://localhost:5001';

// We receive the 'isOpen' prop from our parent (App.js)
const Sidebar = ({ isOpen }) => {
  // 'sessions' will hold our list of past chats (e.g., [{id: 's1', title: '...'}])
  const [sessions, setSessions] = useState([]);
  
  // 'useNavigate' is a hook from React Router that lets us change the URL
  const navigate = useNavigate();

  // This function fetches the list of sessions from the backend
  const fetchSessions = async () => {
    try {
      const response = await fetch(`${API_URL}/api/sessions`);
      const data = await response.json();
      setSessions(data); // Store the list in our state
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  // 'useEffect' with an empty array `[]` runs *once* when the component
  // first loads, just like "componentDidMount".
  // This is the perfect place to fetch our initial data.
  useEffect(() => {
    fetchSessions();
  }, []);

  // This function is called when the "+ New Chat" button is clicked
  const handleNewChat = async () => {
    try {
      // 1. Ask the backend to create a new session
      const response = await fetch(`${API_URL}/api/new-chat`);
      const newSession = await response.json(); // e.g., { id: 's5', title: 'New Chat' }
      
      // 2. Add this new session to the *top* of our state (so it appears first in the list)
      setSessions(prevSessions => [newSession, ...prevSessions]);
      
      // 3. Use 'navigate' to change the URL to the new chat page (e.g., /chat/s5)
      navigate(`/chat/${newSession.id}`);
    } catch (error) {
      console.error('Error creating new chat:', error);
    }
  };

  return (
    // This outer div handles the animation.
    // Based on the 'isOpen' prop, it changes its width and padding.
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
      
      {/* This inner div handles the layout *inside* the sidebar.
        'flex flex-col h-full' makes it a full-height flex column.
        This is what allows us to push the "User" info to the bottom.
        The 'opacity' classes make the content fade in/out smoothly.
      */}
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
          'flex-1' makes this div "grow" and take up all available
          vertical space, pushing the User Info div down.
        */}
        <div className="flex-1 overflow-y-auto">
          {sessions.length > 0 ? (
            // Loop over our 'sessions' state and create a Link for each one
            sessions.map(session => (
              <Link
                key={session.id}
                to={`/chat/${session.id}`} // This sets the URL, e.g., /chat/s1
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
          'mt-auto' (margin-top: auto) is the magic class that pushes
          this block to the bottom of the 'flex-col' parent.
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