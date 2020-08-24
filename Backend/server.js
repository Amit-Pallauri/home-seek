const app = require('./app')
const port = process.env.PORT || 3000
const http = require('http').createServer(app)

// things that will be removed after we are done
const socket = require('socket.io')
const io = socket(http);
const { verify } = require('jsonwebtoken');
const Chat = require('./models/Chat');


io.on('connection', (socket)=>{
    // console.log('made socket connectin')
    
    socket.on('input chat message', async msg => {
        try {
            const { userToken, message }  = msg
            const isVerified = await verify(userToken, process.env.privatekey)
            if(isVerified) {
                const newChat = await Chat.create({
                    sender : isVerified.id,
                    message : message
                })
                newChat.save((err, res)=>{
                    if(err) return res.json({ success : false, err })
                    Chat.findById(newChat._id).populate('sender').exec((err, data) => {
                        return io.emit('output chat message', {
                            data 
                        })
                    })
                })
            }else console.log('invalid credentials')
        } catch (error) {
            console.log(error)
        }
    })

    socket.on('disconnect', () => {
        // console.log('user has left')
    })
})




http.listen(port, ()=> console.log(`server running on ${port}`))
module.exports = http