const express = require('express');
const Post = require('../models/post.model');
const Product = require('../models/product.model');
const router = express.Router();

// Route to create a new post
router.post('/', async (req, res) => {
    console.log('Post route triggered:', req.body);
    const { username, title, content } = req.body;

    try {
        // Fetch the user to validate and get their username
        console.log('Searching for user with username:', username);
        const user = await Product.findOne({ username });
        console.log('FindOne Result:', user); 
        if (!user) {
            console.log('User not found in database');
            return res.status(404).json({ message: 'User not found' });
        }

        // Create the post
        const newPost = await Post.create({
            username: user.username,
            title,
            content,
        });

        console.log('New Post Created:', newPost);
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error.message);
        res.status(500).json({ message: 'Failed to create post' });
    }
});

// Route to fetch all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }); // Fetch and sort by latest
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error.message);
        res.status(500).json({ message: 'Failed to fetch posts' });
    }
});

router.put('/:id/react', async (req, res) => {
    const { id } = req.params; // Extract post ID from URL
    const { emoji, userId } = req.body; // Extract emoji and userId from request body

    console.log('Reacting to post:', { id, emoji, userId });

    try {
        const post = await Post.findById(id); // Find the post by ID
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Ensure the reactions map exists
        if (!post.reactions) {
            post.reactions = new Map();
        }

        // Toggle the reaction
        const currentCount = post.reactions.get(emoji) || 0;
        if (currentCount > 0) {
            // If the user has reacted, decrease the count
            post.reactions.set(emoji, currentCount - 1);
        } else {
            // Otherwise, increment the count
            post.reactions.set(emoji, currentCount + 1);
        }

        await post.save();

        res.status(200).json({ reactions: Object.fromEntries(post.reactions) }); // Send updated reactions
    } catch (error) {
        console.error('Error reacting to post:', error.message);
        res.status(500).json({ message: 'Failed to react to post' });
    }
});


module.exports = router;
