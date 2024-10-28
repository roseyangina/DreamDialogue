const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const cors = require('cors'); // Import CORS
const productRoute = require('./routes/product.route.js');
const app = express()

// middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // message for the root route
});

// routes
app.use('/api/products', productRoute);

mongoose.connect("mongodb+srv://tranjonathan0917:DreamDialogue@dreamdialogue.bbacb.mongodb.net/?retryWrites=true&w=majority&appName=DreamDialogue")
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(() => {
        console.log("Connected failed!");
    });
    