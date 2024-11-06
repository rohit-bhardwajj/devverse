// server/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'a64859c0a4f43e1eb5c87b83670c1cd30898fed3dc1190feffbf1f717a342fa2';

// Register Route
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Register request:', req.body);

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists');
            return res.status(400).json({ error: 'User already exists' });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({ error: 'User registration failed', details: err.message });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login request:', req.body);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '30d' });
        console.log('Login successful');
        res.json({ message: 'Login successful', token, user: { id: user._id, username: user.username } });
    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
