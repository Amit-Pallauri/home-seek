const Posts = require("../models/Posts");
const Users = require("../models/Users");
const Details = require("../models/Details");
const NormalRequests = require("../models/NormalRequests");
const UserRequests = require("../models/UserRequest");
const bufferToString = require('../utils/bufferToString');
const cloudinary = require('../utils/cloudinary');

module.exports = {
    //Owner Posts
    async PostsCreate (req, res)  {
        try {
            const user = req.user
            const {phoneNumber,confirmPhoneNumber,noOfProperty,location,ownerShip,societyName,bedRooms,vacant, name} = req.body;
            if(phoneNumber !== confirmPhoneNumber) {
                return res.status(404).json({ message: "Phone Number must be same"})
            }
            const createHouse = await Posts.create({phoneNumber,confirmPhoneNumber,noOfProperty,location,ownerShip,societyName,bedRooms,vacant, name, owner: user._id} );
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
            const posts = await Posts.find({ verified: false });
            res.status(200).json({ listings: posts})
        } catch (err) {
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
            const updateHouse = await Details.findByIdAndUpdate({_id: foundPost.details},{...req.body})
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
            const id = req.params.homeId
            const foundPost = await Posts.findByIdAndDelete({ _id: id })
            const updateHouse = await Details.deleteOne({_id: foundPost.details})
            return res.status(200).json({ message: "deleted Successfully"})            
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
            const requests = await UserRequests.find({}).populate('user', "owner")
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
    }
}