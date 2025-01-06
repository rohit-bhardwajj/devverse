// server/models/Snippet.js
const mongoose = require('mongoose');

const snippetSchema = new mongoose.Schema({
    title: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true}
);

module.exports = mongoose.model('Snippet', snippetSchema);
