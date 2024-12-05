const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter username"],
        },
        password: {
            type: String,
            required: [true, "Please enter password"],
        },
        bio: {
            type: String, // Optional field
            required: false,
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
