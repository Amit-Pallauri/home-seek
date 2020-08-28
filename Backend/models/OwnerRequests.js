const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ownnerRequestSchema = new Schema(
    {
        request : {
            type: String,
            require : true
        },
        description : {
            type : String,
            require : false
        },
        user : {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        listing : {
            type : Schema.Types.ObjectId,
            ref : "posts"
        }
    },
    { timestamps: true}
)

const ownerRequest = mongoose.model("ownerRequest", ownnerRequestSchema);

module.exports = ownerRequest;

