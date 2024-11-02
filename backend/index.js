// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Import the auth routes
const snippetRoutes = require('./routes/snippetRoutes');
const blogRoutes = require('./routes/blogRoutes'); // Import blog routes

require('dotenv').config(); // Load environment variables from .env file

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
app.use('/api/snippets', snippetRoutes); // Mount the Snippet route
app.use('/api/blogs', blogRoutes); // Mount the Blog route

// Your routes and other logic here
app.get('/', (req, res) => {
    res.send('Welcome to the DevVerse Home!');
});

const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
