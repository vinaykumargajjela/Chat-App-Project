import React, { useState, useEffect, useRef } from 'react';
// Import hooks to get URL parameters
import { useParams } from 'react-router-dom';

// Import the sub-components
import ChatInput from './ChatInput';
import TableResponse from './TableResponse';
import AnswerFeedback from './AnswerFeedback';

const API_URL = 'http://localhost:5001';

const ChatWindow = () => {
  // Get the 'sessionId' from the URL (e.g., /chat/s1)
  const { sessionId } = useParams();
  
  // 'messages' will hold our array of chat messages for this session
  const [messages, setMessages] = useState([]);
  
  // 'chatEndRef' is used to auto-scroll to the bottom
  const chatEndRef = useRef(null);

  // This function fetches the *entire* chat history for a session
  const fetchChatHistory = async (id) => {
    // Don't fetch if the ID is "undefined" (like in your screenshot)
    if (!id || id === 'undefined') {
      setMessages([]); // Clear messages
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/session/${id}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data); // Load the history into state
      } else {
        console.error('Failed to fetch session history');
        setMessages([]); // Clear on error
      }
    } catch (error) {
      console.error('Error fetching session:', error);
      setMessages([]);
    }
  };

  // This 'useEffect' hook runs whenever the 'sessionId' in the URL changes.
  // This is how we load the chat when a user clicks a session in the sidebar.
  useEffect(() => {
    fetchChatHistory(sessionId);
  }, [sessionId]);

  // This 'useEffect' scrolls to the bottom every time 'messages' changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // This function is passed down to ChatInput.
  // It handles sending a new message to the backend.
  const handleSendMessage = async (userQuestion) => {
    // 1. Add the user's message to the state *immediately*.
    // This makes the UI feel fast.
    const userMessage = { from: 'user', text: userQuestion };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      // 2. Send the question to the backend POST endpoint
      const response = await fetch(`${API_URL}/api/chat/${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: userQuestion }),
      });
      
      const botResponse = await response.json();
      
      // 3. Add the bot's response to the state
      setMessages(prevMessages => [...prevMessages, botResponse]);
      
    } catch (error) {
      console.error('Error sending message:', error);
      // You could add an error message to the chat here
    }
  };

  return (
    // 'flex-col h-full' makes it a full-height, vertical layout
    <div className="flex flex-col h-full p-4">
      
      {/* 1. Message Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.length > 0 ? (
          // Loop over the messages and render them
          messages.map((msg, index) => (
            <div key={index}>
              {/* User Message */}
              {msg.from === 'user' && (
                <div className="flex justify-end">
                  <div className="p-3 bg-blue-500 text-white rounded-lg max-w-lg">
                    <p>{msg.text}</p>
                  </div>
                </div>
              )}
              
              {/* Bot Message */}
              {msg.from === 'bot' && (
                <div className="flex justify-start">
                  <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg max-w-2xl">
                    
                    {/* // V-- THIS IS THE DESCRIPTION --V */}
                    <p className="mb-2">{msg.text}</p>
                    
                    {/* Render the table *if* it exists */}
                    {/* // V-- THIS IS THE TABLE --V */}
                    {msg.table && (
                      <TableResponse 
                        headers={msg.table.headers} 
                        rows={msg.table.rows} 
                      />
                    )}
                    
                    <AnswerFeedback />
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          // Show this if the chat is empty
          <div className="text-center text-gray-400 dark:text-gray-500">
            No messages in this chat yet.
          </div>
        )}
        
        {/* This empty div is our "anchor" for auto-scrolling */}
        <div ref={chatEndRef} />
      </div>
      
      {/* 2. Chat Input Area */}
      {/* We pass the 'handleSendMessage' function as a prop */}
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;