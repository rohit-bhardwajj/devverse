// routes/blogRoutes.js
const express = require('express');
const Blog = require('../models/Blog');
const router = express.Router();

// Create a new blog post
router.post('/', async (req, res) => { // Change from '/create' to '/'
    const { title, content, tags, author } = req.body;

    try {
        const blog = new Blog({ title, content, tags, author });
        const savedBlog = await blog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create blog post' });
    }
});

// Get all blog posts
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username email'); // Populate author details
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username email');
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
});

// Update a blog post
router.put('/:id', async (req, res) => {
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

// Delete a blog post
router.delete('/:id', async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) return res.status(404).json({ error: 'Blog not found' });
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete blog' });
    }
});

module.exports = router;
