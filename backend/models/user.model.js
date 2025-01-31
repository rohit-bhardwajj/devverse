import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    // username: { type: String, required: true, unique: true },
    name:{type:String,required:true,trim:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: [true] },
    role: { type: String, default: "user" },
    likedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }] // Array to track liked blogs
    ,
    // refreshToken:{
    //    type:String,
    // }
},{timestamps:true}
);


// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Compare password method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// userSchema.methods.generateRefreshToken = function(){

//     return  jwt.sign(
//         { _id: this._id },
//         process.env.REFRESH_TOKEN_SECRET,
//         {
//             expiresIn: process.env.REFRESH_TOKEN_EXPIRY
//         }
//     )
// }
// userSchema.methods.generateAccessToken = function(){

//   return  jwt.sign(
//         {
//             _id:this._id,
//             username:this.username,
//             fullName : this.fullName,
//             email:this.email
//         },
//         process.env.ACCESS_TOKEN_SECRET,
//         {
//             expiresIn:process.env.ACCESS_TOKEN_EXPIRY
//         }
//     )
// }


export const User = new mongoose.model("User",userSchema);
