const Admin = require("../models/Admin");
const {sign, verify} = require("jsonwebtoken");
const { privatekey, email, apppassword } = process.env


module.exports = {
    
    adminRegister: async (req, res) => {
        try {
            const newAdmin = await Admin.create({...req.body});
            const token = sign({ id: newAdmin._id }, privatekey , { expiresIn : "24h" })
            newAdmin.accessToken = token
            await newAdmin.save()
            res.status(200).json({
                "message" : "successfully registered",
                "data" : newAdmin
            })
        } catch (err) {
            console.log(err.message)
            res.status(400).json({ err : err.message })
        }
    },
    
    adminLogin: async (req, res) => {
        try {
            const {email, password} = req.body
            const foundAdmin = await Admin.findByEmailAndPassword(email, password)
            const token = await sign({ id: foundAdmin._id }, privatekey, { expiresIn : "24h" })
            foundAdmin.accessToken = token
            await foundAdmin.save()
            return res.status(200).json({
                "message" : "logged in successfully",
                "token" : token
            })
        } catch (err) {
            console.log(err.message)
            res.status(400).json({ err : err.message })
        }
    },

    adminLogout: async (req, res)=>{
        try {
            const token = req.headers.authorization 
            const foundAdmin = await Admin.findOneAndUpdate({ accessToken: token }, { accessToken : null })
            if(!foundAdmin) return res.status(400).json({'message' : 'invalid credentials'})
            return res.json({'message' : 'loggedOut successfully'})
        } catch (error) {
            res.json({'error' : error.message})
        }
    },

    adminProfile: async (req, res) => {
        try {
            const admin = req.admin
            return res.json({adminProfile: admin})
        } catch (error) {
            res.json({'error' : error.message})
        }
    }
}