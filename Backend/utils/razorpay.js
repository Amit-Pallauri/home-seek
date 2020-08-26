const Razorpay = require("razorpay");
// const {config} = require("dotenv")
// config()
const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env
const instance = new Razorpay({
    key_id : RAZORPAY_KEY_ID,
    key_secret : RAZORPAY_KEY_SECRET
})

module.exports = instance