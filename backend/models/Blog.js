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
        default: false,
    },
    isLiked: {
        type: Boolean,
        // default: false,
        default: false,
    },
    photo: {
        type: String, // Path to the photo file
        required: true,
    }
},{timestamps:true}
);

// Automatically update `updatedAt` before saving but we used timestamps that does the work for us
// blogSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
