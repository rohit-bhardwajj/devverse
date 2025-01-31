import {Router} from 'express'
import { Blog } from '../models/blog.model.js';
import {User} from '../models/user.model.js'
import { isAdmin, verifyJWT } from '../middleware/auth.middleware.js';
import { createBlog, getAllBlogs, getBlogPhoto, getVerifiedBlogById, likeBlog,VerifyBlogs } from '../controller/blog.controller.js';
import {upload} from '../middleware/multer.middleware.js'
const router = Router();


// Route to create a new blog post (with image upload)
router.route("/create-blog").post(upload.single("blogImage"),createBlog);

// Route to get all verified blog posts
router.route("/all-blogs").get(getAllBlogs)
router.route("/blog-image/:id").get(getBlogPhoto)
router.route("/:id").get(verifyJWT,getVerifiedBlogById)
// router.route("/u/:id").get(verifyJWT,getUnverifiedBlogById)

// // Route to update a blog post by ID
// router.put('/:id', async (req, res) => {
//     const { title, content, tags } = req.body;

//     try {
//         const updatedBlog = await Blog.findByIdAndUpdate(
//             req.params.id,
//             { title, content, tags, updatedAt: Date.now() },
//             { new: true }
//         );
//         if (!updatedBlog) return res.status(404).json({ error: 'Blog not found' });
//         res.json(updatedBlog);
//     } catch (error) {
//         res.status(400).json({ error: 'Failed to update blog' });
//     }
// });

// Route to delete a blog post by ID
// router.delete('/:id', async (req, res) => {
//     try {
//         const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
//         if (!deletedBlog) return res.status(404).json({ error: 'Blog not found' });
//         res.json({ message: 'Blog deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to delete blog' });
//     }
// });

// Route to get all unverified blog posts (admin only)
// router.get('/admin', verifyJWT, );

// Route to like or unlike a blog post
router.post('/like/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params._id);
        const user = await User.findById(req.user._id);
        
        if (!blog || !user) return res.status(404).json({ error: 'Blog or User not found' });

        const hasLiked = user.likedBlogs.includes(blog._id);
        // const hasLiked = user.likedBlogs.includes(blog.id);
        
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
},likeBlog);

// Route to get all blogs liked by the user
router.get('/liked-blogs', async (req, res) => {
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

router.route("/admin").get(verifyJWT,isAdmin,VerifyBlogs)


export default router;
