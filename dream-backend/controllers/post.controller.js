const Post = require('../models/post.model');
const bcrypt = require('bcrypt');

// Make a post
const makePost = async (req, res) => {
    const { username, content } = req.body;

    try {
        const newPost = await Post.create({ username, content });
        res.status(201).json({ message: "Post created successfully", postId: newPost._id });
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ message: 'Failed to create post' });
    }
};

// Get all user posts
const getUserPosts = async (req, res) => {
    const { username } = req.params;

    try {
        const posts = await Post.find({ username });
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error.message);
        res.status(500).json({ message: 'Error retrieving posts' });
    }
};

// Update a post via post ID
const updatePost = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(
            postId,
             { content },
             { new: true }
        );
        res.status(200).json(post);
    } catch (error) {
        console.error('Error updating post:', error.message);
        res.status(500).json({ message: 'Error updating post' });
    }
};

// Delete a post via post ID
const deletePost = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findByIdAndDelete(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({ message: 'Error deleting post' });
    }
};

module.exports = { makePost, getUserPosts, updatePost, deletePost };