const express = require('express');
const bcrypt = require('bcrypt'); // Ensure bcrypt is imported
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Registration error:', err); // This will log the exact error
        res.status(400).json({ error: 'User registration failed', details: err.message });
    }
});


// Login user and return JWT
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
