const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userRequestSchema = new Schema(
    {
        requests : {
            type: String
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

