// controllers/blogController.js
const Blog = require('../models/Blog');

// Controller to handle liking a blog
const likeBlog = async (req, res) => {
    try {
        // Find the blog by ID
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        // Increment the like count
        blog.likes += 1;
        await blog.save();

        // Send the updated like count as the response
        res.status(200).json({ likes: blog.likes });
    } catch (error) {
        console.error('Error liking the blog:', error);
        res.status(500).json({ message: 'Error liking blog' });
    }
};

module.exports = { likeBlog };
