## Simple Chat: A React & Node.js Demo App
Hey there! 👋 Welcome to Simple Chat.

This is a fun, full-stack demo project built to showcase the fundamentals of a modern web application. It features a sleek React frontend (styled with Tailwind CSS) and a lightweight Node.js/Express backend that serves mock data to simulate a real conversation.

This project was built as a great way to practice connecting a frontend to a backend, managing state in React, and building a clean, component-based UI.

# 🚀 Live Demo : [https://chat-app-project-blush.vercel.app](https://chat-app-project-li7zuy0x1-vinaykumargajjelas-projects.vercel.app/)
Check out the live app here!

(Note: Replace the link above with your actual deployment URL from services like Vercel, Netlify, or Heroku.)

📸 Sneak Peek
It's always best to add a screenshot or a quick GIF of your app in action!

<img width="1902" height="895" alt="image" src="https://github.com/user-attachments/assets/10ade1da-cd95-4f27-bf09-16416e0d774a" />



# ✨ Key Features
Mock Chat Interface: A clean UI for sending and receiving messages.

Chat History Sidebar: View all your past conversations and start new ones.

Collapsible Menu: The sidebar can be hidden to give you more room.

Mock Backend: A Node.js/Express server that serves mock data, no database required!

API Integration: The frontend fetches sessions, creates new chats, and gets responses from the backend API.

Dark/Light Mode: A theme toggle to switch between dark and light modes.

Responsive Design: Built with Tailwind CSS for a great look on all screen sizes.

# 🛠️ Tech Stack
This project is split into two main parts:

Frontend (Built with React)
React: For building the user interface.

React Router: For handling client-side routing (e.g., /chat/:sessionId).

Tailwind CSS: For all styling and the dark mode theme.

Lucide-React: For clean, simple icons.

Backend (Built with Node.js)
Node.js: The JavaScript runtime environment.

Express: A fast, minimal web framework for building the API.

CORS: Middleware to allow the frontend (on a different port) to talk to the backend.

Nodemon: For automatically restarting the server during development.

# 📁 Folder Structure
Here's a simplified look at the project's layout:

Bash
```

chat-app-project/
├── backend/
│   ├── mockData.js     # Simulated database with bot responses
│   ├── package.json    # Backend dependencies (Express, cors, etc.)
│   └── server.js       # The Express API server logic
│
└── frontend/
    ├── package.json    # Frontend dependencies (React, tailwind, etc.)
    ├── public/
    │   └── index.html  # The main HTML template
    ├── src/
    │   ├── components/ # All the React components
    │   │   ├── Sidebar.js
    │   │   ├── ChatWindow.js
    │   │   ├── ThemeToggle.js
    │   │   └── ...
    │   ├── App.js        # Main app component & router setup
    │   └── index.js      # React's entry point
    └── tailwind.config.js # Tailwind theme configuration

```

# 🏃‍♂️ Getting Started
Want to run this project on your local machine? Here’s how:

Prerequisites
You'll need to have Node.js (which includes npm) installed on your computer.

Installation & Running
This project has two parts (backend and frontend) that must be run in separate terminal windows.

1. Clone the Repository:

Bash
```

git clone https://github.com/vinaykumargajjela/chat-app-project.git
cd chat-app-project
2. Run the Backend Server: In your first terminal:

Bash

# Navigate to the backend folder
cd backend

# Install the dependencies
npm install

# Start the server (using nodemon)
npm start
Your backend API is now running and listening on http://localhost:5001.

3. Run the Frontend App: In a second, new terminal:

Bash

# Navigate to the frontend folder
cd frontend

# Install the dependencies
npm install

# Start the React development server
npm start

```
Your React app is now running and will automatically open in your browser at http://localhost:3000.

You can now use the app!

# 🤖 API Endpoints
The backend server provides the following API endpoints:

GET /api/sessions

Fetches the list of all chat session IDs and titles.

GET /api/new-chat

Creates a new, empty chat session and returns its details.

GET /api/session/:id

Fetches the full message history for a specific session.

POST /api/chat/:id

Sends a new user message and returns a random mock response from the bot.
