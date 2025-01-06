import mongoose from 'mongoose'
import {ApiError} from '../utils/ApiError.js'
import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'
import {ApiResponse} from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js'


const generateAccessAndRefreshTokens = async (UserId) => {

    try {
        const user = await User.findById(UserId);
        const refreshToken = await user.generateRefreshToken()
        const accessToken = await user.generateAccessToken()
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return {refreshToken,accessToken}
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating Refresh and Acess tokens", error)
    }

}
const registerUser = asyncHandler(async (req, res) => {

    const { username,fullName, email, password } = req.body;

    if ([username, email, password,fullName].some((field) => field?.trim() === "")) {
        throw new ApiError(409, "All fields are compulsory")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with username or email already exists! ")
    }

    const user = await User.create({
        username: username?.toLowerCase(),
        fullName,
        email,
        password,
    })

    const userCreated = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!userCreated) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200,
            userCreated,
            "User registered successfully"
        )
    )


}
)
const loginUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }
    const isPasswordValid = await user.matchPassword(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User Credentials")
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
    const loggedinUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,
            {loggedinUser,accessToken,refreshToken},
            "User logged in Successfully"
        )
    )
})
const logoutUser = asyncHandler(async (req, res) => {
    
    const options = {
        httpOnly:true,
        secure:true
    }

    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out"
        )
    )
    
})
//implement token renew logic
const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingRefreshToken){
        throw new ApiError(401,"Unauthorized request")
    }
    const decodedToken = jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
    const user = await User.findById(decodedToken?._id)
    if(!user){
        throw new ApiError(401,"Invalid refresh token")
    }
    if(incomingRefreshToken !== user?.refreshToken){
        throw new ApiError(401,"Refresh token is expired or used")
    }
    const {newRefreshToken,accessToken} = await generateAccessAndRefreshTokens(user._id)

    const options = {
        secure:true,
        httpOnly : true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",newRefreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                accessToken,
                refreshToken:newRefreshToken
            },
            "Access token refreshed"
        )
    )

    
})

export { registerUser, loginUser, logoutUser,refreshAccessToken }