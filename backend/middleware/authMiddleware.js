const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    // Check if authorization header exists and starts with 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]; // Extract the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

            // Attempt to find the user by ID
            req.user = await User.findById(decoded.id).select('-password'); // Exclude password from user object

            // Check if user was found
            if (!req.user) {
                return res.status(401).json({ error: 'Not authorized, user not found' });
            }

            next(); // Proceed to the next middleware or route handler
        } catch (error) {
            console.error('Token verification error:', error); // Log the error for debugging
            res.status(401).json({ error: 'Not authorized, token failed' }); // Handle token failure
        }
    } else {
        res.status(401).json({ error: 'Not authorized, no token' }); // No token provided
    }
};

// Middleware to check if user is an admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next(); // User is admin, proceed
    } else {
        res.status(403).json({ error: 'You are not authorized as admin' });
    }
};

module.exports = { protect, admin };
