const { verify } = require('jsonwebtoken')
const privatekey = 'AmitPallauri'

module.exports = async (req, res, next) => {
    try {
        token = req.headers.authorization
        if(!token) return res.status(400).json({'message' : 'token needed'})
        const isVerified = await verify(token, privatekey)
        if(!isVerified) return res.status(400).json({'message' : 'invalid credentials'})
        next()
    } catch (error) {
        res.json({'error' : error.message})
    }
}