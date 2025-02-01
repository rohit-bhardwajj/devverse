import {Router} from 'express'
import { registerUser,loginUser,} from '../controller/user.controller.js'
import { verifyJWT,isAdmin } from '../middleware/auth.middleware.js'

const router = Router()

router.route("/register").post(registerUser)
router.route("/user-auth").get(verifyJWT,(req, res) => { res.status(200).send({ ok: true }) });
router.route("/login").post(loginUser)
router.route("/admin-auth").get(verifyJWT, isAdmin,
     (req, res) => { res.status(200).send({ ok: true }) });
// router.route("/logout").post(verifyJWT,logoutUser)

// router.route("/refresh-token").post(refreshAccessToken)
// router.route("/admin").get(verifyJWT,async (req, res) => {
//     try {
//         const blogs = await Blog.find({ isVerified: false });
//         res.json(blogs);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to fetch unverified blogs" });
//     }
// })

export default router;