const { Schema, model } = require('mongoose')

const ChatSchema = new Schema({
    message : {
        type : String,
        required:  true
    },
    sender : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
}, {timestamps : true})

const Chat = model('chat', ChatSchema)
module.exports = Chat