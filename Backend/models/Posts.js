const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postsSchema = new Schema(
    {
        location: {
            type: {
              type: String,
              enum: ['Point']
            },
            coordinates: {
              type: [Number],
              index: '2dsphere'
            },
            formattedAddress: String
        },
        ownerShip: {
            type: String,
            required: true
        },
        societyName: {
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
            required: false
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