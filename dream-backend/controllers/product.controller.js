const Product = require('../models/product.model');
const bcrypt = require('bcrypt');
// Registration
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = await Product.create({ username, password: hashedPassword });
        res.status(201).json({ message: "User registered successfully", userId: newUser._id });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Have failed to register user' });
    }
};

// Login
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await Product.findOne({ username }); // Find user by username
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password); // Compare hashed password
        if (match) {
            res.status(200).json({ _id: user._id, username: user.username }); // Send back user data
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProducts = async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products:', error.message);
        res.status(500).json({ message: 'Error retrieving products' });
    }

}

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.error('Error getting product:', error.message);
        res.status(500).json({ message: 'Error getting product' });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Post a dream for a user
const postDream = async (req, res) => {
    const { id } = req.params; // User ID from route params
    const { title, content } = req.body; // Dream details from request body
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "User not found" });
      }
  
      product.dreams.push({ title, content });
      await product.save();
      res.status(200).json({ message: "Dream posted successfully", dreams: product.dreams });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    postDream,
    registerUser, 
    loginUser,
};