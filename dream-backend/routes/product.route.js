const express = require('express');
const Product = require('../models/product.model');
const router = express.Router();
console.log('product.route.js loaded');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, postDream, registerUser, loginUser } = require('../controllers/product.controller.js');


// Added routes for user registration and login 
router.post('/register', (req, res, next) => {
    console.log('Register route triggered:', req.body);
    next();
}, registerUser);

router.post('/login', loginUser); // Login route

// Login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Product.findOne({ username }); // Find user by username
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password); // Check password
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Send back full user profile
        res.status(200).json({
            userId: user._id,
            username: user.username,
            bio: user.bio || '', // Default to empty string if no bio is set
        });
    } catch (error) {
        console.error('Error logging in:', error.message);
        res.status(500).json({ message: 'Failed to login' });
    }
});

// Update the bio of a user
router.put('/profile-setup/:id', async (req, res) => {
    const { id } = req.params; // Get user ID from params
    const { bio } = req.body; // Get bio from request body

    try {
        const updatedUser = await Product.findByIdAndUpdate(
            id, 
            { bio }, // Update bio field
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser); // Send back the updated user
    } catch (error) {
        console.error(' Error updating bio:', error.message);
        res.status(500).json({ message: 'Failed to update bio' });

    }
});


router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
//update a product
router.put("/:id", updateProduct);
//delete a product
router.delete("/:id", deleteProduct);

// Route to post a dream for a specific product (user)
router.post('/:id/dream', postDream);


module.exports = router;