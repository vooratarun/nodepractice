// app.js
const express = require('express');
const loggerMiddleware = require('./loggerMiddleware');
const logger = require('./logger');

const app = express();

// Use the logger middleware
app.use(loggerMiddleware);

// Define some routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/error', (req, res) => {
  logger.error('This is an error message');
  res.status(500).send('Something went wrong');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
