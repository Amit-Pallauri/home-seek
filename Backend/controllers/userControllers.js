const User = require('../models/Users')
const { sign, verify } = require('jsonwebtoken')
const { privatekey, email, apppassword } = process.env

module.exports = {
    signUp : async ( req, res )=>{
        try {
            const newUser = await User.create({...req.body})
            const token = sign({ newUser }, privatekey , { expiresIn : 60*60*1 })
            newUser.accessToken = token
            await newUser.save()
            res.status(200).json({
                "message" : "user saved. Please verify your account",
                "data" : newUser
            })

            // sending verification via mail
            const nodemailer = require("nodemailer");
            let transporter = nodemailer.createTransport({
                service : 'gmail',
                port: 465,
                secure: true,
                auth: {
                    user: email,
                    pass: apppassword,
                },
            });

            await transporter.sendMail({
                from: `"Home Seek Team" <${email}>`,
                to: newUser.email, 
                subject: "credentials verification", 
                html: `<p>Hello mr/mrs <b>${newUser.name}</b> to Home Seek. your token  is <b>${newUser.accessToken}</b></p>`,
            });
            console.log(`Message sent to ${newUser.name}`);
        } catch (error) {
            console.log(error.message)
        }
    },
    signIn : async (req, res)=>{
        try {
            const {email, password} = req.body
            const foundUser = await User.findByEmailAndPassword(email, password)
            if( !foundUser.accessToken ){
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
            }else{
                const verifiedToken = await verify(foundUser.accessToken, privatekey)
                if(!verifiedToken){
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
                }else 
                    return res.status(200).json({
                    "message" : "you have already logged in",
                    "token" : foundUser.accessToken
                    })
            }
        } catch (error) {
            res.json({'error' : error.message})
        }
    },
    signOut: async (req, res)=>{
        try {
            const token = req.headers.authorization 
            const foundUser = await User.findOneAndUpdate({ accessToken: token }, { accessToken : null })
            if(!foundUser) return res.status(400).json({'message' : 'invalid credentials'})
            return res.json({'message' : 'loggedOut successfully'})
        } catch (error) {
            res.json({'error' : error.message})
        }
    },
    verifyUser : async (req, res)=>{
        try {
            const token = req.headers.authorization
            const foundUser = await User.findOneAndUpdate({ accessToken : token }, { verified : true })
            if(!foundUser.accessToken) return res.status(400).json({"message" : "Invalid credentials"})
            return res.status(200).json({
                "message" : "you have been verified"
            })
        } catch (error) {
            console.log(error)
        }
    }
}