import { model, Schema } from "mongoose";

const categorySchema = new Schema({
    name: {
        type: String,
    },
    slug: {
        type: String,
        lowercase: true,
    },
})

export default model('Category', categorySchema);