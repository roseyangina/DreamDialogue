const express = require('express');
const Post = require('../models/post.model');
const router = express.Router();
const { makePost, getUserPosts, updatePost, deletePost } = require('../controllers/post.controller.js');

// Routes for posts
router.post('/', makePost);

router.get('/:username', getUserPosts);

router.put('/:postId', updatePost);

router.delete('/:postId', deletePost);

module.exports = router;