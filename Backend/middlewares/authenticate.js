const { verify } = require('jsonwebtoken');
const Users = require("../models/Users");
const Admins = require("../models/Admin");
const privatekey = 'AmitPallauri'

module.exports = {
    verifyToken : async (req, res, next) => {
        try {
            token = req.headers.authorization
            if(!token) return res.status(400).json({'message' : 'token needed'})
            const foundUser = await Users.findOne({accessToken : token})
            if(!foundUser) return res.status(400).json({'message' : 'invalid credentials'})
            else if(foundUser.verified === false) return res.status(400).json({'message' : 'user is not verified'})
            verify(token, privatekey, (err, _)=>{
                if(err && err.name == 'JsonWebTokenError') return res.status(400).json({'message' : 'invalid credentials'})
                else if(err && err.name == 'TokenExpiredError') return res.status(400).json({'message' : 'token expired'})
                next()
            })
        } catch (error) {
            console.log(error.message)
            return res.status(400).send(error.message)
        }
    },
    verifyUser : async(req, res, next) => {
        try {
            const {email, password} = req.body
            const foundUser = await Users.findByEmailAndPassword(email, password)
            if(foundUser.verified === false) return res.status(200).json({ 'message' : 'verify your mail id please'})
            next()
        } catch (error) {
            console.error(error)
            return res.status(400).send(error.message)
        }
    },
    verifyAdmin : async (req, res, next) => {
        try {
            token = req.headers.authorization
            if(!token) return res.status(400).json({'message' : 'token needed'})
            const isVerified = await verify(token, privatekey)
                const admin = await Admins.findOne({_id: isVerified.id})
                req.admin = admin
                const user = await Users.findOne({_id: isVerified.id})
                req.user = user

            if(!isVerified) return res.status(400).json({'message' : 'invalid credentials'})
           next()
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ message: "Server Error"})
        }
    }
}