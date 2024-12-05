const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const cors = require('cors'); // Import CORS
const productRoute = require('./routes/product.route.js');
const postRoute = require('./routes/post.route.js');

const liveChatRoute = require('./routes/livechat.route'); 

const app = express(); // Initialize app first

// middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    console.log(`Received ${req.method} request to ${req.url}`);
    next();
});
app.use((req, res, next) => {
    console.log(`Request Body Logger:`, req.body);
    next();
});


app.use('/api/products', productRoute);
app.use('/api/posts', postRoute);
app.use('/api/livechat', liveChatRoute);


mongoose.connect("mongodb+srv://tranjonathan0917:DreamDialogue@dreamdialogue.bbacb.mongodb.net/?retryWrites=true&w=majority&appName=DreamDialogue")
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3001, () => {
            console.log('Server is running on port 3001');
        });
    })
    .catch(() => {
        console.log("Connected failed!");
    });
    