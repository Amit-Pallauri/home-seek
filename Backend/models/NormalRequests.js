const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const normalRequestSchema = new Schema(
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

const normalRequest = mongoose.model("normalRequest", normalRequestSchema);

module.exports = normalRequest;

