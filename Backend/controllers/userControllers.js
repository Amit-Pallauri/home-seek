const User = require('../models/Users')
const { sign, verify } = require('jsonwebtoken')
// const { privatekey } = process.env
const privatekey = 'AmitPallauri'

module.exports = {
    signUp : async ( req, res )=>{
        try {
            const newUser = await User.create({...req.body})
            const token = sign({ newUser }, privatekey , { expiresIn : 60*60*1 })
            newUser.accessToken = token
            await newUser.save()
            res.send(newUser)
        } catch (error) {
            res.json({'error' : error.message})
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
    }
}