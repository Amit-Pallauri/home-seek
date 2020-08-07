const { verify } = require('jsonwebtoken')
const User = require('../models/Users')
const privatekey = 'AmitPallauri'

module.exports = {
    verifyToken : async (req, res, next) => {
        try {
            token = req.headers.authorization
            if(!token) return res.status(400).json({'message' : 'token needed'})
            const foundUser = await User.findOne({accessToken : token})
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
            const foundUser = await User.findByEmailAndPassword(email, password)
            if(foundUser.verified === false) return res.status(200).json({ 'message' : 'verify your mail id please'})
            next()
        } catch (error) {
            console.error(error)
            return res.status(400).send(error.message)
        }
    }
}