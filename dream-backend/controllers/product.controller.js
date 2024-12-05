const Product = require('../models/product.model');
const bcrypt = require('bcrypt');
// Registration
const registerUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        console.log('Password hashed successfully');

        const newUser = await Product.create({ username, password: hashedPassword, bio: ''  });
        console.log('User created successfully:', newUser);

        // Include the full user object in the response
        res.status(201).json({ 
            _id: newUser._id, 
            username: newUser.username, 
            bio: newUser.bio || '', 
        });
    } catch (error) {
        console.error('Error during registration:', error.message);
        res.status(500).json({ message: 'Have failed to register user' });
    }
};

// Login
const loginUser = async (req, res) => {
    console.log('loginUser triggered with body:', req.body);
    const { username, password } = req.body;

    try {
        const user = await Product.findOne({ username }); // Find user by username
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password); // Compare hashed password
        if (match) {
            res.status(200).json({
                _id: user._id,
                username: user.username,
                bio: user.bio || '', // Include bio; default to empty string if not set
            }); // Send back user data
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error during login:", error.message);
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
    console.log('New User Created:', newUser);
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from params
        const { bio } = req.body; // Extract fields from the request body

        console.log('Updating product with:', { id, username, bio });

        // Update user fields
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            { bio }, // Fields to update
            { new: true, runValidators: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        console.log('Updated product:', updatedProduct);
        res.status(200).json(updatedProduct); // Return the updated product
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ message: "Failed to update product" });
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

  // Placeholder for deleteProduct
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the product ID is passed in the request parameters
        console.log(`Attempting to delete product with ID: ${id}`);
        
        // Simulate deletion process
        res.status(200).json({ message: `Placeholder: Product with ID ${id} deleted successfully.` });
    } catch (error) {
        console.error('Error deleting product:', error.message);
        res.status(500).json({ message: 'Failed to delete product' });
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