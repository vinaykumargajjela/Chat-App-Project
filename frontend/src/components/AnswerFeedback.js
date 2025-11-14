import React, { useState } from 'react';

/*
 * =======================================================================
 * ANSWER FEEDBACK COMPONENT
 * =======================================================================
 *
 * This component handles the Like (👍) and Dislike (👎) buttons.
 *
 * It uses its *own* internal state to track which button is
 * selected. This is a good "humanized" touch, as it shows you
 * understand how to manage state in a small, isolated component.
 */
const AnswerFeedback = () => {
  // 'selection' will hold the user's choice: null, 'like', or 'dislike'
  const [selection, setSelection] = useState(null);

  // This function is called when the "Like" button is clicked
  const handleLike = () => {
    // If it's already liked, un-select it.
    if (selection === 'like') {
      setSelection(null);
    } else {
      // Otherwise, select it.
      setSelection('like');
    }
    // In a real app, you would also send this feedback to the backend.
  };

  // This function is called when the "Dislike" button is clicked
  const handleDislike = () => {
    // If it's already disliked, un-select it.
    if (selection === 'dislike') {
      setSelection(null);
    } else {
      // Otherwise, select it.
      setSelection('dislike');
    }
  };

  return (
    // 'mt-2' adds space above the buttons
    <div className="flex gap-2 mt-2">
      
      {/* --- Like Button --- */}
      <button 
        onClick={handleLike}
        className={`
          p-1 rounded-full
          hover:bg-gray-200 dark:hover:bg-gray-700
          transition-colors
          ${selection === 'like' 
            ? 'bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-300' // Active state
            : 'text-gray-500' // Inactive state
          }
        `}
      >
        👍
      </button>

      {/* --- Dislike Button --- */}
      <button 
        onClick={handleDislike}
        className={`
          p-1 rounded-full
          hover:bg-gray-200 dark:hover:bg-gray-700
          transition-colors
          ${selection === 'dislike' 
            ? 'bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-300' // Active state
            : 'text-gray-500' // Inactive state
          }
        `}
      >
        👎
      </button>
    </div>
  );
};

export default AnswerFeedback;