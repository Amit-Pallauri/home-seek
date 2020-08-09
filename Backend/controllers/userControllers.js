const User = require('../models/Users')
const { sign } = require('jsonwebtoken')
const { privatekey } = process.env
const bufferToString = require('../utils/bufferToString')
const cloudinary = require('../utils/cloudinary')
const { sendMail } = require('../utils/sendMail')
const {createToken} = require('../utils/createToken')

module.exports = {
    signUp : async ( req, res )=>{
        try {
            const newUser = await User.create({...req.body})
            createToken(newUser, 'confirm')
            await newUser.save()
            res.status(201).json({
                "message" : "user saved. Please verify your account",
                "data" : newUser
            })
            sendMail(newUser, 'verify', 'confirm')
        } catch (error) {
            console.log(error.message)
            res.status(404).json({'error' : 'server error'})
        }
    },
    signIn : async (req, res)=>{
        try {
            const {email, password} = req.body
            const foundUser = await User.findByEmailAndPassword(email, password)
            if(!foundUser) return res.status(400).send('inavlid credentials')
            const token = await sign({ foundUser }, privatekey, { expiresIn : 60*60*1 })
            if(!token) return res.status(404).json({ "message" : "server error" })
            else{
                foundUser.accessToken = token
                await foundUser.save()
                return res.status(200).json({
                    "message" : "logged in successfully",
                    "token" : token
                })
            }        
        } catch (error) {
            console.log(error.message)
            res.status(404).json({'error' : 'server error'})
        }
    },
    signOut: async (req, res)=>{
        try {
            const token = req.headers.authorization 
            const foundUser = await User.findOneAndUpdate({ accessToken: token }, { accessToken : null })
            if(!foundUser) return res.status(400).json({'message' : 'invalid credentials'})
            return res.json({'message' : 'loggedOut successfully'})
        } catch (error) {
            console.log(error.message)
            res.status(404).json({'error' : 'server error'})
        }
    },
    verify : async (req, res)=>{
        try {
            const token = req.params.token
            if(!token) return res.status(400).send('invalid credentials')
            const foundUser = await User.findOneAndUpdate({ accessToken : token }, { verified : true })
            if(!foundUser) return res.status(400).json({"message" : "Invalid credentials"})
            return res.status(200).json({
                "message" : "you have been verified"
            })
        } catch (error) {
            console.log(error.message)
            res.status(404).json({'error' : 'server error'})
        }
    },
    addProfile : async (req, res)=>{
        try {
            const accessToken = req.headers.authorization
            const { originalname, buffer } = req.file
            const imageContent = bufferToString( originalname, buffer)
            const { secure_url } = await cloudinary.uploader.upload(imageContent)
            const foundUser = await User.findOneAndUpdate({ accessToken }, { image : secure_url })
            res.json({
                'message' : 'image uploaded',
                'image' : secure_url   
            })      
        } catch (error) {
            console.log(error.message)
            res.status(404).json({'error' : 'server error'})
        }
    },
    forgotPassword : async (req, res)=>{
        try {
            const email = req.body.email
            const foundUser = await User.findOne({email})
            createToken(foundUser, 'temp')
            await foundUser.save()
            sendMail(foundUser, 'revivePassword', 'temp')
            res.json({'message' : 'kindly check your mail id'})
        } catch (error) {
            console.log(error.message)
            res.status(404).json({'error' : 'server error'})
        }
    },
    revivePassword : async (req, res)=>{
        try {
            const token = req.params.token
            if(!token) return res.status(400).send('invalid credentials')
            const foundUser = await User.findOne({ tempToken : token })
            if(!foundUser) return res.status(400).send('invalid credentials')
            const { newPassword, confirmPassword } = req.body
            if(newPassword !== confirmPassword) return res.send('passwords didnt match')
            foundUser.password = newPassword
            await foundUser.save()
            return res.status(200).json({'message' : 'password changed successfully'})
        } catch (error) {
            console.log(error.message)
            res.status(404).json({'error' : 'server error'})
        }
    },
    logInViaGoogle : async(req, res)=>{
        try {
            const user = req.user
            const accessToken = createToken(user)
            await user.save()
            // send the token as cookie
            res.cookie("accessToken", accessToken, {
                expires: new Date(Date.now() + 1000 * 60* 60* 12 ),
                httpOnly: true,
                sameSite :'none'
            })
            // redirect to the client route
            res.redirect('http://localhost:3001/')
        } catch (error) {
            console.log(error)
            res.status(400).json({'error' : error.message})
        }
    },
    logInViaFacebook : async(req, res)=>{
        try {
            const user = req.user
            const accessToken = createToken(user)
            await user.save()
            // send the token as cookie
            res.cookie("accessToken", accessToken, {
                expires: new Date(Date.now() + 1000 * 60* 60* 12 ),
                httpOnly: true,
                sameSite :'none'
            })
            // redirect to the client route
            res.redirect('http://localhost:3001/')
        } catch (error) {
            console.log(error)
            res.status(400).json({'error' : error.message})
        }
    }
} 