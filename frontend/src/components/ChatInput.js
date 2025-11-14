import React, { useState } from 'react';

// We receive the 'onSend' function as a prop from ChatWindow
const ChatInput = ({ onSend }) => {
  // 'input' will hold the text in the text box
  const [input, setInput] = useState('');

  // This function is called when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the webpage from reloading
    
    // Don't send empty messages
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
    
    onSend(trimmedInput); // Call the function from ChatWindow
    setInput(''); // Clear the input box
  };

  return (
    // We use a <form> element to easily handle "Enter" key submission
    <form onSubmit={handleSubmit} className="mt-4 relative">
      <input
        type="text"
        value={input} // Bind the input's value to our state
        onChange={(e) => setInput(e.target.value)} // Update state on every keystroke
        placeholder="Ask a question..."
        className="
          w-full 
          p-4 pr-16 
          border border-gray-300 dark:border-gray-600 
          rounded-lg 
          bg-white dark:bg-gray-800
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      />
      {/* Send Button */}
      <button 
        type="submit" 
        className="
          absolute right-3 top-1/2 -translate-y-1/2 
          p-2 
          rounded-full 
          bg-blue-500 text-white 
          hover:bg-blue-600
          disabled:bg-gray-400
        "
        disabled={!input.trim()} // Disable button if input is empty
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;