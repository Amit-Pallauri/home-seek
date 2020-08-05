const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema(
    {
        Title: {
            type: String,
            required: true
        },
        Description: {
            type: String,
            required: true
        },
        Price: {
            type: Number,
            required: true
        },
        Images: {
            type: String,
            required: true
        },
        Location: {
            type: String,
            required: true
        },
        Details: {
            type: Schema.Types.ObjectId,
            ref: "details"
        }
    },
    { timestamps: true}
)

const Posts = mongoose.model("posts", postsSchema);

module.exports = Posts;