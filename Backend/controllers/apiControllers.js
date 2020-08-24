const Posts = require("../models/Posts");
const Users = require("../models/Users");
const Details = require("../models/Details");
const NormalRequests = require("../models/NormalRequests");
const UserRequests = require("../models/UserRequest");
const AmountPay = require("../models/AmountPay");
const createSignature = require("../utils/createSignature");
const bufferToString = require('../utils/bufferToString');
const cloudinary = require('../utils/cloudinary');
const instance = require("../utils/razorpay");
const {v4 : uuid } = require("uuid");
const {TWILIO_SERVICE_ID,TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN} = process.env
const client = require("twilio")(TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN)

module.exports = {
    //Owner Posts
    async PostsCreate (req, res)  {
        try {
            const user = req.user
            const createHouse = await Posts.create({
                ...req.body,
                owner: user._id
            });
            user.listings.push(createHouse._id)
            user.owner = true
            await user.save()
            res.status(201).json({YourHouse: createHouse, message: "Our team will get touch with you, Thanks for listing ur house"})
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    //Get the posts
    async GetPost (req, res) {
        try {
            const posts = await Posts.find({ });
            res.status(200).json({ listings: posts})
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    async GetParticularPost (req, res) {
        try {
            const id = req.params.homeId
            const foundPost = await Posts.findById({ _id: id }).populate('details')
            res.status(200).json({ particuarPost: foundPost})
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }

    },

    async GetAllPosts (req, res) {
        try {
            const posts = await Posts.find({ verified: true }).populate('details')
            res.status(200).json({ listings: posts}) 
        } catch (error) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },
    //Admin creating the details
    async detailsCreate (req, res) {
        try {
            const admin = req.admin
            const id = req.params.homeId
            const foundPost = await Posts.findById({ _id: id })
            const body = JSON.parse(req.body.data)
            let images = req.files;
            const updateHouse = await Details.create({...body})
            images.forEach(async element => {
                if(element.originalname !== undefined){
                    const imageContent = bufferToString( element.originalname, element.buffer)
                    const { secure_url } = await cloudinary.uploader.upload(imageContent)
                    updateHouse.images.push(secure_url)
                    updateHouse.save()
                }
            });
            foundPost.details = updateHouse._id
            foundPost.verified = true
            admin.verifiedHomes.push(foundPost._id)
            admin.save()
            foundPost.save()
            return res.status(200).json({ message: "House is verified and updated Successfully"})
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    //Admin updating the details
    async detailsUpdate (req, res) {
        try {
            const id = req.params.homeId
            const foundPost = await Posts.findById({ _id: id })
            const body = JSON.parse(req.body.data)
            let images = req.files;
            const updateHouse = await Details.findByIdAndUpdate({_id: foundPost.details},{...body})
            images.forEach(async element => {
                if(element.originalname !== undefined){
                    const imageContent = bufferToString( element.originalname, element.buffer)
                    const { secure_url } = await cloudinary.uploader.upload(imageContent)
                    updateHouse.images.push(secure_url)
                    updateHouse.save()
                }
            });
            updateHouse.save()
            return res.status(200).json({ message: "updated Successfully", updated: updateHouse})
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    //Admin deleting the details
    async postDelete (req, res) {
        try {
            const id = req.params.postId
            const foundPost = await Posts.findByIdAndDelete({ _id: id })
            return res.status(200).json({ message: "the post deleted Successfully"})            
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    async postAndDetailsDelete (req, res) {
        try {
            const id = req.params.homeId
            const foundPost = await Posts.findByIdAndDelete({ _id: id })
            const updateHouse = await Details.deleteOne({_id: foundPost.details})
            return res.status(200).json({ message: "the post and details deleted Successfully"})            
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    async createUserRequest (req, res) {
        try {
            const user = req.user;
            const {requests} = req.body
            const createUserRequest = await UserRequests.create({requests: requests, user: user._id})
            user.userRequests = createUserRequest._id
            createUserRequest.save()
            user.save()
            return res.status(200).json({ message: "requested sent Successfully, our team will contact you soon", message: createUserRequest})            
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    async getUserRequests (req, res) {
        try {
            const requests = await UserRequests.find({}).populate({ path: 'user', model: 'user', populate: {
                path: 'listings',
                model: 'posts'
            }});
            res.status(200).json({UserRequests: requests})
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    async deleteUserRequests (req, res) {
        try {
            const id = req.params.requestId;
            const foundRequest = await UserRequests.findById({_id: id})
            const foundUser = await Users.findById({_id : foundRequest._id})
            foundUser.userRequests = null
            await foundRequest.deleteOne({_id: id})
            return res.status(200).json({ message: "deleted Successfully"})            
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message}) 
        }
    },

    async createNormalRequest (req, res) {
        try {
            const user = req.user;
            const {requests} = req.body
            const createNormalRequest = await NormalRequests.create({requests: requests, user: user._id})
            user.normalRequests = createNormalRequest._id
            createNormalRequest.save()
            user.save()
            return res.status(200).json({ message: "requested sent Successfully, our team will contact you soon", message: createNormalRequest})            
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    async getNormalRequests (req, res) {
        try {
            const requests = await NormalRequests.find({}).populate('user')
            res.status(200).json({NormalRequests: requests})
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    async deleteNormalRequests (req, res) {
        try {
            const id = req.params.requestId;
            const foundRequest = await NormalRequests.findById({_id: id})
            const foundUser = await Users.findById({_id : foundRequest._id})
            foundUser.normalRequests = null
            await foundRequest.deleteOne({_id: id})
            return res.status(200).json({ message: "deleted Successfully"})            
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message}) 
        }
    },
    async filterSearch (req, res) {
        try {
            let filteredData = []
            const {location, type, maxRent, minRent } = req.query
            console.log(maxRent, minRent)
            const locationeWise = await Details.find({ location })
            const typeWise = await Details.find({ type })
            const rentWise = await Details.find({ rent : { $gte : minRent, $lte : maxRent}})
            filteredData.push(rentWise)
            res.status(200).json({'filteredData' : filteredData})
        } catch (error) {
            console.log(error)
        }
    },
    async amountpaycreate (req, res) {
        try {
            const user = req.user;
            const {amountInPaise, currency} = req.body;
            const transactionId = uuid()
            const orderOptions = {
                currency,
                amount : amountInPaise,
                receipt: transactionId,
                payment_capture: 0
            }
            const order = await instance.orders.create(orderOptions);
            const transactions = await AmountPay.create({user: user._id, transactionId: transactionId, orderValue: `${amountInPaise / 100} INR`, razorpayOrderId: order.id })
            res.status(201).json({message: "payment successfull", orderId: order.id})
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    async verifyAmountPayment (req, res) {
        const {amount,currency,razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
        try {
            const createdSignature = createSignature(razorpay_order_id, razorpay_payment_id);
            if(createdSignature !== razorpay_signature) {
                return res.status(401).send({ message: "Invalid payment request"})
            }
            const captureResponse = await instance.payments.capture(razorpay_payment_id, amount, currency)
            const foundPayment = await AmountPay.find({razorpayOrderId: razorpay_order_id})
            if(!foundPayment) {
                return res.status(401).send({ message: "Invalid payment request"})
            }
            foundPayment[0].razorpayTransactionId = razorpay_payment_id
            foundPayment[0].razorpaySignature = razorpay_signature
            foundPayment[0].isPending = false
            foundPayment[0].save()
            res.status(201).json(foundPayment)
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    async createOTP (req, res) {
        const {phoneNumber} = req.body
        try {
            const sendOTP = await client.verify.services(TWILIO_SERVICE_ID).verifications.create({
                to: `+${phoneNumber}`,
                channel: "sms"
            })
            res.status(200).json({message: "message Sent Successfully", data: sendOTP})
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    },

    async verifyOTP (req, res) {
        const {phoneNumber, code} = req.body
        const user = req.user
        try {
            const verifyOTP = await client.verify.services(TWILIO_SERVICE_ID).verificationChecks.create({
                to: `+${phoneNumber}`,
                code: code
            })
            user.isVerifiedPhoneNumber = true;
            user.phoneNumber = phoneNumber
            user.save()
            res.status(200).json({message: "verified Successfully", token: user.accessToken, user: user})
        } catch (err) {
            console.error(err)
            res.status(400).json({err : err.message})
        }
    }
}