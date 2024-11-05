// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    content: {
        type: String,
        required: true,
        minlength: 10,
    },
    tags: {
        type: [String],
        default: [],
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    isVerified: {
        type: Boolean,
        // default: false,
        default: true,
    },
    isLiked: {
        type: Boolean,
        // default: false,
        default: false,
    },
    photo: {
        type: String, // Path to the photo file
        required: true,
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

// Automatically update `updatedAt` before saving
blogSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
