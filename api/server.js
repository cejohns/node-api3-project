const express = require('express');
const usersRouter = require('./users/users-router'); // Adjust the path as necessary
const { logger } = require('./middleware/middleware'); // Adjust the path as necessary

const server = express();

// Parse JSON request bodies
server.use(express.json());

// Logger middleware for every request
server.use(logger);

// Connect the users router
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
