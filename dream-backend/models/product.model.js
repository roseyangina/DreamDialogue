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

        sleepHours: {
            type: Number,
            required: [false, "Please enter total sleep hours"],
        },
    },
    
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;