const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRequestSchema = new Schema(
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
        }
    },
    { timestamps: true}
)

const userRequest = mongoose.model("userRequest", userRequestSchema);

module.exports = userRequest;

