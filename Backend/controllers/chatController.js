const Chat = require('../models/Chat')

module.exports = {
    getChats : async (_, res) => {
        try {
            const foundChats = await Chat.find({}).populate('sender')
            if (!foundChats) return res.status(400).json({ success : false, error : 'no chats found'})
            res.status(200).send(foundChats)
        } catch (error) {
            console.log(error)
            res.status(400).json({ success : false, error : error})   
        }
    }
}