import { Blog } from "../models/blog.model.js";
import { Like } from "../models/like.model.js";
import asyncHandler from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose, { isValidObjectId, Schema } from "mongoose";
import slugify from "slugify";

const createBlog = asyncHandler(async(req,res)=>{
   const{title,description,content,category} = req.body;
   
   if(!title || !content|| !description ){
        throw new ApiError(400,"Title and content are required")
   }
   
   //    const blogImageLocalPath = req.files?.blogImage[0]?.path
      const blogImageLocalPath = req.file?.path
      console.log(req.file);
      
   if(!blogImageLocalPath){
    throw new ApiError(400,"blog-image file is missing")
   }
   const blogImage = await uploadOnCloudinary(blogImageLocalPath);
   if(!blogImage){
    throw new ApiError(409,"Unable to upload blog-image on Cloudinary")
   }
   const blog = await Blog.create({
    title,
    content,
    description,
    slug:slugify(title),
    category,
    // tags:Array.isArray(tags)?tags.map((tag)=>tag.trim()):tags.split(",").map((tag)=>tag.trim()),
    blogImage:blogImage.url,
    // author:req.user._id?req.user._id:null
   })
   const blogCreated = await Blog.findById(blog._id);
   if(!blogCreated){
    throw new ApiError(500,"Something went wrong while creating the blog")
   }

   return res
   .status(201)
   .json(
    new ApiResponse(200,
        blogCreated,
        "Blog created successfully"
    )
   )
   
})

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog
            .find({})
            .select("-blogImage")
            .populate("category")
            .sort({ createdAt: -1 });
        res.status(200).send({
            success: true,
            TotalCount: blogs.length,
            message: "All blogs",
            blogs,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            error,
            message: "Error in getting blogs",
        });
    }
};
const getBlogPhoto = async (req, res) => {
    const {identifier} = req.params
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
    try {
        const blog = await Blog.aggregate([
            {
            $match:{
                $or:[{_id:isObjectId? new mongoose.Types.ObjectId(identifier):null},{slug:identifier}]
            }
            },
            {
                $project:{
                    blogImage:1
                }
            }
        ])
        if (!blog || !blog[0].blogImage ) {
            return res.status(404).send('Image not found');
        }
        // res.set('Content-type', blog.blogImage.contentType);
        
        return res.status(200).send(blog[0].blogImage);
    } catch (error) {
        res.status(500).send({
            success: false,
            message: 'Error while getting photo',
            error,
        });
    }

};

const toggleBlogLike = asyncHandler(async(req,res)=>{
    try {
        const {blogId} = req.params;
        const FoundLiked = await Like.findOne({blog:blogId,likedBy:req.user._id})
        if(FoundLiked){
            //delete
             await Like.findByIdAndDelete(FoundLiked._id);
        }
        else{
            //like
          await Like.create({
                blog:blogId,
                likedBy:req.user?._id
            })
        }
        const totalLikes = await Like.countDocuments({blog:blogId})
        return res.status(200).json({liked:!FoundLiked,likes:totalLikes})
    } catch (error) {
        console.log("Error :",error);
        res.status(500).json({
            message:"Server error"
        })
    }
})
const checkBlogLike = asyncHandler(async(req,res)=>{
   try {
    const {blogId} = req.params;
    
    const like = await Like.findOne({blog:blogId , likedBy:req.user?._id})
    if(like){
        return res.json({liked:true})
    }
    else{
        return res.json({liked:false})
    }
    
   } catch (error) {
    console.log("Error ",error);    
    return res.status(500).send({
        message:"Server error"
    })
    
   }
})

// const VerifyBlogs = asyncHanlder(async(req,res)=>{
//     const blogs = await Blog.aggregate([
//         {
//             $match:{isVerified:false}
//         },
//         {
//            $lookup:{
//             from:"users",
//             localField:"author",
//             foreignField:"_id",
//             as: "author",
//             pipeline:[
//                 {
//                     $project:{
//                         username:1,
//                         fullName:1,
//                         avatar:1
//                     }
//                 }
//             ]
//            } 
//         },{
//             $unwind:"$author"
//         },
//         {
//             $project:{
//                 title:1,
//                 content:1,
//                 isVerified:1,
//                 author:1,
//                 blogImage:1,
//                 likes:1,
//                 views:1,
//                 tags:1,
//                 createdAt:1
//             }
//         }
//     ])

//     return res
//     .status(200)
//     .json(
//         new ApiResponse(200,
//             {blogs:blogs},
//             "All unverified Blogs fetched Successfully"
//         )
//     )
// })//pending verification logic
const getSingleBlogController = asyncHandler(async(req,res)=>{
    const {slug} = req.params;
    if(!slug){
        throw new ApiError(400,"Try searching existing blog");
    }
    const blog = await Blog.aggregate([
        {
         $match: {
                slug:slug,
              }
        },
        {
            $project:{
               _id:1,
                title:1,
                content:1,
                description:1,
                createdAt:1,
                tags:1,
            } 
        }
])
const totalLikes = await Like.countDocuments({blog:blog[0]._id})
console.log("Found itne likes in controller :",totalLikes);


if(!blog){
    throw new ApiError(404,"Error in finding blog");
}
// if(!totalLikes){
//     throw new ApiError(404,"Error in calculating likes");
// }
return res
.status(200)
.json({
    blog:blog[0],
    likes:totalLikes
}
    // new ApiResponse(
    //     200,
    //     {blog:blog[0]},
    //     {likes:totalLikes},
    //     "Blog fetched successfully"
    // )
)

})
const getLatestBlogs = asyncHandler(async(req,res)=>{
    try {
        const latestBlogs = await Blog.find({}).sort({createdAt:-1}).select("-blogImage").populate("category").limit(10).sort({ createdAt: -1 })
        res.status(200).send({
            success: true,
            message: "latest Blogs",
            latestBlogs,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while geting latest blogs",
            error,
        });
    }
})



export {createBlog,checkBlogLike,toggleBlogLike,getBlogPhoto,getAllBlogs,getSingleBlogController,getLatestBlogs}
