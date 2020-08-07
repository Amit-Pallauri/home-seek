const { verify } = require('jsonwebtoken');
const Users = require("../models/Users");
const Admins = require("../models/Admin");
const privatekey = 'AmitPallauri'

module.exports = async (req, res, next) => {
    try {
        token = req.headers.authorization
        if(!token) return res.status(400).json({'message' : 'token needed'})
        const isVerified = await verify(token, privatekey)
        if(isVerified.newAdmin) {
            const admin = await Admins.findOne({_id: isVerified.newAdmin._id})
            req.admin = admin
        } else {
            const user = await Users.findOne({_id: isVerified.foundUser._id})
            req.user = user
        }
        if(!isVerified) return res.status(400).json({'message' : 'invalid credentials'})
       next()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Server Error"})
    }
}