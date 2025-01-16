import {Router} from 'express'
import { registerUser,loginUser,logoutUser,refreshAccessToken } from '../controller/user.controller.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

const router = Router()

router.route("/register").post(registerUser)

router.route("/login").post(loginUser)

router.route("/logout").post(verifyJWT,logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

export default router;