const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Sample GET route
app.get('/', (req, res) => {
  res.send('Hello, Express Server is running!');
});

// Sample POST route
app.post('/data', (req, res) => {
  const { name } = req.body;
  res.send(`Received data for: ${name}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
