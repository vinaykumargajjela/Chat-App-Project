// --- Imports ---

// Import Express, our web server framework
const express = require('express');
// Import CORS to allow our frontend (running on a different port) to make requests to this server
const cors = require('cors');
// Import our mock data to simulate a database
const { sessions, chatHistories, botResponses } = require('./mockData');

// --- Basic Setup ---

// Initialize the Express app
const app = express();
// Define the port to run on. Use an environment variable if available, otherwise default to 5001
const PORT = process.env.PORT || 5001;

// --- Middleware ---

// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());
// Enable the server to understand and parse incoming JSON payloads (like from our POST requests)
app.use(express.json());

// --- API Endpoints ---

/**
 * [GET] /api/sessions
 * Fetches the list of all existing chat sessions (id and title).
 * This is used by the frontend to build the chat history sidebar.
 */
app.get('/api/sessions', (req, res) => {
  // Just return the 'sessions' array from our mock data
  res.json(sessions);
});

/**
 * [GET] /api/new-chat
 * Creates a new, empty chat session and adds it to our in-memory data.
 */
app.get('/api/new-chat', (req, res) => {
  // Generate a simple new ID. (Note: This is not safe for a real app!)
  const newSessionId = `s${sessions.length + 1}`;
  const newSession = {
    id: newSessionId,
    title: `New Chat ${sessions.length + 1}`,
  };

  // --- Update "database" ---
  // Add the new session to the *beginning* of the list so it appears at the top
  sessions.unshift(newSession);
  // Create an empty chat history array for this new session ID
  chatHistories[newSessionId] = [];

  // Return the new session object to the frontend so it can navigate to it
  res.json(newSession);
});

/**
 * [GET] /api/session/:id
 * Fetches the full chat history for a single, specific session ID.
 */
app.get('/api/session/:id', (req, res) => {
  // Get the session ID from the URL parameters (e.g., /api/session/s1)
  const { id } = req.params;
  const history = chatHistories[id];

  // Check if we actually have a history for this ID
  if (history) {
    res.json(history);
  } else {
    // If not, send a 404 "Not Found" error
    res.status(404).json({ error: 'Session not found' });
  }
});

/**
 * [POST] /api/chat/:id
 * Handles a new user message, gets a mock response, and saves both to the history.
 */
app.post('/api/chat/:id', (req, res) => {
  const { id } = req.params;
  // Get the user's question from the incoming JSON body
  const { question } = req.body;

  // Safety check: make sure the session actually exists before trying to add to it
  if (!chatHistories[id]) {
    return res.status(404).json({ error: 'Session not found' });
  }

  // 1. Format the user's message object
  const userMessage = { from: 'user', text: question };

  // 2. Get a random response from our list of bot templates in mockData.js
  // We use {...} to create a *copy* so we don't accidentally change the original template
  const botResponse = { ...botResponses[Math.floor(Math.random() * botResponses.length)] };
  
  // 3. Add both new messages to this session's history
  chatHistories[id].push(userMessage);
  chatHistories[id].push(botResponse);
  
  // 4. Send *only* the new bot response back to the client
  res.json(botResponse);
});

// --- Start Server ---

// Start the server and listen for requests on the defined port
app.listen(PORT, () => {
  console.log(`Mock API server listening on http://localhost:${PORT}`);
});