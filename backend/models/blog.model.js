import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        // minlength: 3,
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        // minlength: 10,
    },
    slug: {
        type: String,
        lowercase: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    blogImage: {
        type: String, // Path to the photo file
        required: true,
    }
},{timestamps:true}
);

// Automatically update `updatedAt` before saving but we used timestamps that does the work for us
// blogSchema.pre('save', function (next) {
//     this.updatedAt = Date.now();
//     next();
// });

export const Blog = mongoose.model('Blog', blogSchema);

