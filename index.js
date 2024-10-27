const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product.model.js');
const productRoute = require('./routes/product.route.js');
const app = express()
const cors = require('cors');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


// routes
app.use('/api/products', productRoute);

mongoose.connect("mongodb+srv://tranjonathan0917:DreamDialogue@dreamdialogue.bbacb.mongodb.net/?retryWrites=true&w=majority&appName=DreamDialogue")
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Server is running on port ${process.env.PORT || 3000}`);
        });
    })
    .catch(() => {
        console.log("Connected failed!");
    });
    