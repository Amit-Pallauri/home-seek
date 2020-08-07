const Posts = require("../models/Posts");
const Users = require("../models/Users");
const Details = require("../models/Details");

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

    //Admin creating the details
    async detailsCreate (req, res) {
        try {
            const admin = req.admin
            const id = req.params.homeId
            const foundPost = await Posts.findById({ _id: id })
            const updateHouse = await Details.create({...req.body})
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
    }
}