import {Router} from 'express'
import { Blog } from '../models/blog.model.js';
import {User} from '../models/user.model.js'
import { isAdmin, verifyJWT } from '../middleware/auth.middleware.js';
import { createBlog, getAllBlogs, getBlogPhoto,getSingleBlogController, getLatestBlogs, checkBlogLike, toggleBlogLike, getLikedBlogs } from '../controller/blog.controller.js';
import {upload} from '../middleware/multer.middleware.js'
const router = Router();


// Route to create a new blog post (with image upload)
router.route("/create-blog").post(upload.single("blogImage"),createBlog);
router.route("/all-blogs").get(getAllBlogs)
router.route("/blog-image/:identifier").get(getBlogPhoto)
router.route("/get-blog/:slug").get(getSingleBlogController);
router.route("/get-latest-blogs").get(getLatestBlogs);
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
// Route to like or unlike a blog post
router.route("/check-blog-like/:blogId").get(verifyJWT,checkBlogLike)
router.route("/like-blog/:blogId").post(verifyJWT,toggleBlogLike)
router.route("/get-liked-blogs").get(verifyJWT,getLikedBlogs)
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

router.route("/admin").get(verifyJWT,isAdmin)


export default router;
