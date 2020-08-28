const User = require('../models/Users')
const Post = require('../models/Posts')
const bufferToString = require('../utils/bufferToString')
const cloudinary = require('../utils/cloudinary')
const { sendMail } = require('../utils/sendMail')
const {createToken} = require('../utils/createToken')

module.exports = {
    signUp : async ( req, res )=>{
        try {
            const newUser = await User.create({...req.body})
            const token = createToken(newUser)
            sendMail(newUser, 'verify', 'confirm')
            if(!token) return res.status(404).json({ "message" : "server error" })
            else{
                newUser.accessToken = token
                await newUser.save()
                return res.status(201).json({
                    "message" : "user saved. Please verify your account",
                    token : token,
                    data : newUser
                })
            }  
        } catch (error) {
            error.name == 'MongoError'
            ? res.status(401).json({message : 'this mail is already registered'})
            : res.status(404).json({code : error.code, message : error.message })
        }
    },
    signIn : async (req, res)=>{
        try {
            const {email, password} = req.body
            const foundUser = await User.findByEmailAndPassword(email, password)
            if(!foundUser) return res.status(400).send('inavlid credentials')
            const token = createToken(foundUser)
            if(!token) return res.status(404).json({ "message" : "server error" })
            else{
                foundUser.accessToken = token
                await foundUser.save()
                return res.status(200).json({
                    message : "logged in successfully",
                    data : foundUser,
                    token : token,
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
            const foundUser = await User.findOneAndUpdate({ accessToken : token }, { verified : true }, { new : true })
            if(!foundUser) return res.status(400).json({"message" : "Invalid credentials"})
            return res.status(200).json({
                "message" : "you have been verified",
                data : foundUser,
                token : token
            })
        } catch (error) {
            console.log(error.message)
            res.status(404).json({'error' : 'server error'})
        }
    },
    uploadProfilePic : async (req, res)=>{
        try {
            const accessToken = req.headers.authorization
            const { originalname, buffer } = req.file
            console.log('file from client :', req.file)
            const imageContent = bufferToString( originalname, buffer)
            const { secure_url } = await cloudinary.uploader.upload(imageContent)
            const foundUser = await User.findOneAndUpdate({ accessToken }, { image : secure_url }, {new : true})
            res.json({
                message : 'image uploaded',
                token : accessToken,
                data : foundUser  
            })      
        } catch (error) {
            console.log(error.message)
            res.status(404).json({'error' : 'server error'})
        }
    },
    addDetails : async (req, res) => {
        try {
            const { DOB , Address, gender, maritalStatus } = req.body
            const foundUser = await User.findOneAndUpdate({ accessToken : req.headers.authorization }, { DOB, Address, gender, maritalStatus }, {new : true})
            if(!foundUser) return res.send('invalid type')
            res.status(200).json({
                success : true,
                data : foundUser,
                token : req.headers.authorization
            })
        } catch (error) {
           res.status(400).json({error : error}) 
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
    loginViaThirdParty : async (req, res) => {
        try {
            const { details : { 
                email
            }} = req.body
            const foundUser = await User.findOne({ email : email })
            if(foundUser !== null){
                const token = createToken(foundUser)
                foundUser.accessToken = token
                await foundUser.save()
                return res.status(201).json({
                    message : 'loggedIn successfully',
                    data : foundUser,
                    token : token
                })
            }else{
                const newUser = await User.create({...req.body.details, isThirdPartyUser : true, verified : true })
                const token = createToken(newUser)
                newUser.accessToken  = token
                await newUser.save()
                return res.status(201).json({
                    message : 'user saved',
                    data : newUser,
                    token : token 
                })
            }
        } catch (error) {
            console.log(error)
            res.status(400).json({message : 'error', error : error})
        }
    },
    updateBankDetails : async (req, res) => {
        try {
            const accessToken = req.headers.authorization
            const { details } = req.body
            const foundUser = await User.findOneAndUpdate({ accessToken }, { bankDetails : details }, { new : true})
            if(!foundUser) res.status(400).json({error : 'invalid credentials'})
            res.status(200).json({
                message : 'bank details updated',
                token : accessToken,
                data : foundUser
            })
        } catch (error) {
            res.status(400).json({error : error})
        }
    },
    getUserhome : async (req, res) => {
        try {
            const accessToken = req.headers.authorization
            const foundUser = await User.findOne({ accessToken }).populate({ path : 'home', model : 'posts', populate : {
                path : 'details',
                model : 'details'
            }})
            console.log(foundUser)
            if(!foundUser) return res.status(400).json({error : 'invalid credentials'})
            return res.json({
                message : 'found home',
                token : accessToken,
                data : foundUser
            }) 
        } catch (error) {
            console.log(error)
            res.status(400).json({
                error : error
            })
        }
    }
} 