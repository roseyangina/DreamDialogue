const express = require('express');
const Product = require('../models/product.model');
const router = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, postDream, registerUser, loginUser } = require('../controllers/product.controller.js');

router.get('/', getProducts);
router.get('/:id', getProduct);

router.post('/', createProduct);


// Added routes for user registration and login
router.post('/register', registerUser); // Registration route
router.post('/login', loginUser); // Login route

//update a product
router.put("/:id", updateProduct);

//delete a product
router.delete("/:id", deleteProduct);

// Route to post a dream for a specific product (user)
router.post('/:id/dream', postDream);


module.exports = router;