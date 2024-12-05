const express = require('express');
const router = express.Router();

// Placeholder for live chat functionality
router.get('/', (req, res) => {
    res.status(200).json({ message: "LiveChat API is under construction" });
});

module.exports = router;
