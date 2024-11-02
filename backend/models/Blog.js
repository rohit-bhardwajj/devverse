// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3, // Optional: enforce minimum title length
    },
    content: {
        type: String,
        required: true,
        minlength: 10, // Optional: enforce minimum content length
    },
    tags: {
        type: [String], // Array of strings for tags
        default: [],    // Empty array if no tags provided
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',    // Reference to the User model if you have one
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

// Automatically update the `updatedAt` field before each save operation
blogSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
