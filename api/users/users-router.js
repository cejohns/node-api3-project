const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const { validateUserId, validateUser, validatePost } = require('../middleware/middleware');

const router = express.Router();

// Use async/await for database operations
router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

// Apply `validateUserId` middleware for routes with `:id`
router.get('/:id', validateUserId, (req, res) => {
  res.json(req.user);
});

router.post('/', validateUser, async (req, res) => {
  try {
    const newUser = await Users.insert(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Error adding user' });
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res) => {
  try {
    const updatedUser = await Users.update(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: 'Error updating user' });
  }
});

router.delete('/:id', validateUserId, async (req, res) => {
  try {
    await Users.remove(req.params.id);
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
  try {
    const posts = await Users.getUserPosts(req.params.id);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Error getting user posts' });
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  try {
    const newPost = await Posts.insert({ ...req.body, user_id: req.params.id });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ message: 'Error adding post' });
  }
});

module.exports = router;
