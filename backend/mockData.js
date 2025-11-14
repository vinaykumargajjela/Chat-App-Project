// This file acts as our temporary, in-memory "database".
// In a real app, this data would come from a service like MongoDB, PostgreSQL, or Firebase.

// A list of all chat sessions.
// The frontend uses this to build the navigation/sidebar.
const sessions = [
  { id: 's1', title: 'First Chat Session' },
  { id: 's2', title: 'React vs. Vue' },
  { id: 's3', title: 'SQL Query Help' },
];

// An object (or "map") that stores the chat history for *each* session.
// The key (e.g., 's1') is the session ID, and the value is an array of messages.
const chatHistories = {
  s1: [
    { from: 'user', text: 'Hi!' },
    { from: 'bot', text: 'Hello! How can I help you today?' },
  ],
  s2: [
    { from: 'user', text: 'What are the main differences between React and Vue?' },
    { 
      from: 'bot', 
      text: 'Here is a quick comparison:', 
      // Note: The 'table' object is a custom format our frontend will know how to render.
      table: {
        headers: ['Feature', 'React', 'Vue'],
        rows: [
          ['Virtual DOM', 'Yes', 'Yes'],
          ['Component-Based', 'Yes', 'Yes'],
          ['Learning Curve', 'Steeper', 'More gradual'],
          ['State Management', 'Redux / Context', 'Vuex (built-in)'],
          ['Routing', 'React Router', 'Vue Router (built-in)'],
        ]
      }
    },
  ],
  s3: [
    { from: 'user', text: 'How do I select all columns from a table named "Users"?' },
    { from: 'bot', text: 'You can do that with the following SQL query:', table: {
      headers: ['Query', 'Description'],
      rows: [
        ['SELECT * FROM Users;', 'Selects all columns and rows.'],
      ]
    }}
  ]
};

// A list of all possible "template" responses the bot can send.
// The /api/chat/:id endpoint picks one of these at random.
const botResponses = [
  {
    from: 'bot',
    text: 'Here is the data you requested for your query:',
    table: {
      headers: ['ID', 'Product', 'Stock', 'Price'],
      rows: [
        ['101', 'Laptop', '25', '$1200'],
        ['102', 'Mouse', '150', '$25'],
        ['103', 'Keyboard', '75', '$70'],
        ['104', 'Monitor', '40', '$300'],
      ]
    }
  },
  {
    from: 'bot',
    text: 'I found the following user information:',
    table: {
      headers: ['User ID', 'Name', 'Email', 'Role'],
      rows: [
        ['u001', 'Alice', 'alice@example.com', 'Admin'],
        ['u002', 'Bob', 'bob@example.com', 'User'],
        ['u003', 'Charlie', 'charlie@example.com', 'User'],
      ]
    }
  },
  {
    from: 'bot',
    text: 'Here is the current project status report you requested:',
    table: {
      headers: ['Project', 'Status', 'Lead', 'Deadline'],
      rows: [
        ['Project Phoenix', 'On Track', 'Alice', '2025-12-15'],
        ['Project Orion', 'Delayed', 'Bob', '2025-11-30'],
        ['Project Pegasus', 'At Risk', 'Charlie', '2025-11-20'],
        ['Project Apollo', 'Completed', 'Alice', '2025-10-01'],
      ]
    }
  },
  {
    from: 'bot',
    text: 'Here are the Q3 financial results:',
    table: {
      headers: ['Metric', 'Q3 Actual', 'Q3 Target', 'Status'],
      rows: [
        ['Revenue (M)', '$15.2', '$15.0', 'Met'],
        ['New Customers', '1,200', '1,100', 'Exceeded'],
        ['Churn Rate', '1.5%', '1.0%', 'Missed'],
        ['Net Profit (M)', '$2.1', '$2.0', 'Met'],
      ]
    }
  },
  {
    from: 'bot',
    text: "I'm sorry, I don't have a specific table for that. I am a mock bot and can only provide sample data. Try asking for 'project status', 'user information', or 'Q3 results'."
    // This response intentionally has no 'table' object, for variety.
  },
  {
    from: 'bot',
    text: 'Here is the live server status you requested:',
    table: {
      headers: ['Service', 'Region', 'Status', 'Latency (ms)'],
      rows: [
        ['Auth API', 'us-east-1', 'Operational', '45ms'],
        ['Database (Primary)', 'us-east-1', 'Operational', '15ms'],
        ['Frontend CDN', 'Global', 'Operational', '12ms'],
        ['Payment Gateway', 'eu-west-1', 'Degraded Performance', '180ms'],
      ]
    }
  },
  // ... (rest of the botResponses array) ...
  {
    from: 'bot',
    text: 'I found the following open support tickets for that user:',
    table: {
      headers: ['Ticket ID', 'Subject', 'Priority', 'Agent'],
      rows: [
        ['T-1004', 'Cannot log in', 'High', 'Alice'],
        ['T-1005', 'Billing question', 'Medium', 'Bob'],
      ]
    }
  }
];

// We export all the data objects so server.js (and any other file)
// can import them using require().
module.exports = {
  sessions,
  chatHistories,
  botResponses,
};