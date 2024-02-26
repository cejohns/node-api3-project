const Users = require('../users/users-model'); // Adjust the path as necessary

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
  next();
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "user not found" });
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving user" });
  }
}

function validateUser(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = { logger, validateUserId, validateUser, validatePost };
