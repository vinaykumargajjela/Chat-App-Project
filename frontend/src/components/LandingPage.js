import React from 'react';

/*
 * This is the component for the "/" route (our homepage).
 * It's just a simple "New Chat" screen to fill the space
 * before a user starts a chat.
 */
const LandingPage = () => {
  return (
    // We center the content in the middle of the screen
    <div className="flex justify-center items-center h-full">
      <h1 className="text-3xl font-bold text-gray-400 dark:text-gray-500">
        Start a new chat
      </h1>
    </div>
  );
};

export default LandingPage;