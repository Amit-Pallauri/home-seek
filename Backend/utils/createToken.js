const { sign } = require('jsonwebtoken')
const { privatekey } = process.env
module.exports = {
    createToken : (user, tokenStatus) => {
        if(tokenStatus === 'confirm'){
            const token = sign({ user }, privatekey , { expiresIn : '24h' })
            user.accessToken = token 
        }else if (tokenStatus === 'temp'){
            const token = sign({ user }, privatekey , { expiresIn : '10m' })
            user.tempToken = token 
        }
    }
}