const express = require('express');
const multer = require('multer');
const Blog = require('../models/Blog');
const User = require('../models/User');
const { protect, admin } = require('../middleware/authMiddleware'); // Ensure protect is implemented to verify JWT
const path = require('path');
const router = express.Router();

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
    const photo = req.file;

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
            photo: photo ? `/uploads/${photo.filename}` : null
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
router.get('/admin', protect, admin, async (req, res) => {
    try {
        const blogs = await Blog.find({ isVerified: false });
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch unverified blogs" });
    }
});

// Route to like or unlike a blog post
router.post('/like/:id', protect, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        const user = await User.findById(req.user.id);
        
        if (!blog || !user) return res.status(404).json({ error: 'Blog or User not found' });

        // const hasLiked = user.likedBlogs.includes(blog._id);
        const hasLiked = user.likedBlogs.includes(blog.id);
        
        if (hasLiked) {
            // Unlike the blog
            user.likedBlogs = user.likedBlogs.filter(id => id.toString() !== blog._id.toString());
            if(blog.likes>0){
                blog.likes -= 1;
            }
        } else {
            // Like the blog
            user.likedBlogs.push(blog._id);
            // user.likedBlogs.push(blog.id);
            blog.likes += 1;
        }

        await user.save();
        await blog.save();
        res.json({ likes: blog.likes });
    } catch (error) {
        res.status(500).json({ error: 'Error updating likes' });
    }
});

// Route to get all blogs liked by the user
router.get('/liked-blogs', protect, async (req, res) => {
    try {
        // Fetch the user
        const user = await User.findById(req.user._id).populate('likedBlogs');
        if (!user) {
            console.error('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the likedBlogs array is empty
        if (!user.likedBlogs || user.likedBlogs.length === 0) {
            console.log('No liked blogs');
            return res.status(404).json({ message: 'No liked blogs found' });
        }

        // Send the liked blogs
        res.status(200).json(user.likedBlogs);
    } catch (error) {
        console.error('Server Error:', error.message);  // Log the full error message
        res.status(500).json({ message: 'Failed to fetch liked blogs', error: error.message });
    }
});



module.exports = router;
