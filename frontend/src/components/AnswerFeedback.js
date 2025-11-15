import React, { useState } from 'react';

/**
 * A component for rendering Like (👍) and Dislike (👎) feedback buttons.
 * It manages its own selection state.
 */
const AnswerFeedback = () => {
  // State holds the user's choice: null, 'like', or 'dislike'
  const [selection, setSelection] = useState(null);

  // Toggles the 'like' state. Can be 'like' or 'null'.
  const handleLike = () => {
    if (selection === 'like') {
      setSelection(null);
    } else {
      setSelection('like');
    }
    // TODO: Send this feedback to the backend
  };

  // Toggles the 'dislike' state. Can be 'dislike' or 'null'.
  const handleDislike = () => {
    if (selection === 'dislike') {
      setSelection(null);
    } else {
      setSelection('dislike');
    }
    // TODO: Send this feedback to the backend
  };

  return (
    <div className="flex gap-2 mt-2">
      
      {/* --- Like Button --- */}
      <button 
        onClick={handleLike}
        className={`
          p-1 rounded-full
          hover:bg-gray-200 dark:hover:bg-gray-700
          transition-colors
          ${selection === 'like' 
            ? 'bg-green-100 text-green-600 dark:bg-green-700 dark:text-green-300' // Active
            : 'text-gray-500' // Inactive
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
            ? 'bg-red-100 text-red-600 dark:bg-red-700 dark:text-red-300' // Active
            : 'text-gray-500' // Inactive
          }
        `}
      >
        👎
      </button>
    </div>
  );
};

export default AnswerFeedback;