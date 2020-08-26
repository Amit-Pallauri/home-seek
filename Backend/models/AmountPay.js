const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const amountPaySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "user"
        },
        transactionId: {
            type: String
        },
        orderValue: {
            type: String
        },
        razorpayOrderId: {
            type: String        
        },
        razorpayTransactionId: {
            type: String
        },
        razorpaySignature: {
            type: String
        },
        isPending: {
            type: Boolean,
            default: true
        }
    },
    {timestamps: true}
)

const AmountPay = mongoose.model("amountpay", amountPaySchema);

module.exports = AmountPay;