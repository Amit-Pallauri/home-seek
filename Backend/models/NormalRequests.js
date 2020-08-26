const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const normalRequestSchema = new Schema(
    {
        request : {
            type: String,
            require : true
        },
        user : {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        home : {
            type: Schema.Types.ObjectId,
            ref: 'posts'
        }
    },
    { timestamps: true}
)

const normalRequest = mongoose.model("normalRequest", normalRequestSchema);

module.exports = normalRequest;

