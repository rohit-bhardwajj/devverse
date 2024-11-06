const express = require('express');
const multer = require('multer');
const Blog = require('../models/Blog');
const { protect,admin } = require('../middleware/authMiddleware'); // Ensure protect is implemented to verify JWT
const router = express.Router();
const path = require('path');
const jwt = require('jsonwebtoken'); // Make sure you're using this correctly for signing or verifying tokens if needed

// Set up multer storage configuration for photo uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads')); // Correct path for the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Add timestamp to file name
    }
});

const upload = multer({ storage });

// Route to create a new blog post (with image upload)
router.post('/createblog', protect, upload.single('photo'), async (req, res) => {
    const { title, content, tags } = req.body;
    const photo = req.file; // Access the uploaded file

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
    }

    try {
        const blog = new Blog({
            title,
            content,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            author: req.user.id, // Assuming req.user is set by protect middleware
            isVerified: false,
            photo: photo ? `/uploads/${photo.filename}` : null // Save relative path if photo exists
        });
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(400).json({ error: 'Failed to create blog post: ' + error.message });
    }
});

// Route to get all verified blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({ isVerified: true }).populate('author', 'username email');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch verified blogs' });
    }
});

// Route to get a single blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username email');
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});

// Route to update a blog post by ID
router.put('/:id', protect, async (req, res) => {
    const { title, content, tags } = req.body;

    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content, tags, updatedAt: Date.now() },
            { new: true }
        );
        if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update blog' });
    }
});

// Route to delete a blog post by ID
router.delete('/:id', protect, async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ error: 'Blog not found' });
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});

// Route to get all unverified blog posts (admin only)
router.get('/admin', async (req, res) => {
    try {
        const blogs = await Blog.find({ verified: false }); // Adjust query as necessary
        res.json(blogs);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "Failed to fetch blog" });
    }
});


// Route to like a blog post
router.post('/like/:id', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        const userId = req.user.id;
        const hasLiked = blog.likes.includes(userId);

        if (hasLiked) {
            // Unlike the blog
            blog.likes = blog.likes.filter(id => id !== userId);
        } else {
            // Like the blog
            blog.likes.push(userId);
        }
        await blog.save();
        res.json({ likes: blog.likes.length });
    } catch (error) {
        res.status(500).json({ error: 'Error updating likes' });
    }
});

// Route to get liked blogs for the user
router.get('/liked-blogs', protect, async (req, res) => {
    try {
        const blogs = await Blog.find({ likes: req.user.id, isVerified: true });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch liked blogs' });
    }
});

module.exports = router;
