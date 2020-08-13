const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema(
    {
        noOfProperty: {
            type: Number,
            required: true
        },
        ownerShip: {
            type: String,
            required: true
        },
        societyName: {
            type: String,
            required: true
        },
        bedRooms: {
            type: String,
            required: true
        },
        vacant: {
            type: Boolean,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        confirmPhoneNumber: {
            type: String,
            required: true
        },
        verified: {
            type: Boolean,
            default: false
        },
        owner : {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        details: {
            type: Schema.Types.ObjectId,
            ref: "details"
        }
    },
    { timestamps: true}
)

const Posts = mongoose.model("posts", postsSchema);

module.exports = Posts;