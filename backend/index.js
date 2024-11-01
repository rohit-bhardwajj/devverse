// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import the auth routes
// index.js
require('dotenv').config(); // Add this line at the very top of your entry file


// dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enables CORS for all routes
app.use(express.json()); // Parse JSON requests

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use authentication routes
app.use('/api/auth', authRoutes); // Mount the auth routes

// Your routes and other logic here
app.get('/home', (req, res) => {
    res.send('Welcome to the DevVerse Home!');
});

const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
