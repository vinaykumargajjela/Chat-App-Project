import React, { useState, useEffect, useRef } from 'react';
// Import hooks to get URL parameters
import { useParams } from 'react-router-dom';

// Import the sub-components
import ChatInput from './ChatInput';
import TableResponse from './TableResponse';
import AnswerFeedback from './AnswerFeedback';

const API_URL = process.env.REACT_APP_API_URL;

const ChatWindow = () => {
  // Get the 'sessionId' from the URL (e.g., /chat/s1)
  const { sessionId } = useParams();
  
  // Holds the array of chat messages for this session
  const [messages, setMessages] = useState([]);
  
  // Used to auto-scroll to the bottom of the chat
  const chatEndRef = useRef(null);

  // Fetches the entire chat history for a given session ID
  const fetchChatHistory = async (id) => {
    // Don't fetch if the ID is invalid
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

  // Runs when the 'sessionId' in the URL changes (e.g., user clicks a different chat)
  useEffect(() => {
    fetchChatHistory(sessionId);
  }, [sessionId]);

  // Scrolls to the bottom every time 'messages' changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Passed to ChatInput to handle sending a new message
  const handleSendMessage = async (userQuestion) => {
    // 1. Add the user's message to state immediately for a responsive UI
    const userMessage = { from: 'user', text: userQuestion };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      // 2. Send the question to the backend
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
      // TODO: Add an error message to the chat UI
    }
  };

  return (
    // Full-height, vertical flex layout
    <div className="flex flex-col h-full p-4">
      
      {/* 1. Message Area (grows to fill space) */}
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
                    
                    {/* Bot's text description */}
                    <p className="mb-2">{msg.text}</p>
                    
                    {/* Render the table if it exists in the response */}
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
          // Placeholder when chat is empty
          <div className="text-center text-gray-400 dark:text-gray-500">
            No messages in this chat yet.
          </div>
        )}
        
        {/* Empty div to anchor the auto-scroll */}
        <div ref={chatEndRef} />
      </div>
      
      {/* 2. Chat Input Area */}
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
