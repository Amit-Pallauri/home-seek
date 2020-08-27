// import React, { useState, useEffect } from 'react'
// import io from 'socket.io-client'
// import { connect } from 'react-redux'
// import { getChats} from '../redux/actions/chatActions'
// import '../styles/chat-styles.css'

// const socket = io.connect('http://localhost:3000')

// const ChatPage = ({ getChats , user, chats }) => {
//     const [message, setMessage] = useState('')
    
//     useEffect( () =>{
//         getChats()
//         socket.on('output chat message', dataFromServer => {
//             // afterChats(dataFromServer)
//         })
//     }, [getChats, chats])

//     const handleSubmit = e =>{ 
//         e.preventDefault();
//         var userToken = user.token
//         var text = message

//         socket.emit('input chat message', {
//             userToken : userToken,
//             message : text
//         })
//         setMessage('')
//     }

//     return (
//         <div className='chat-container'>
//             <div className='chat-display'>
//                 { 
//                    chats.map(chat => {
//                        return (
//                         <div key={chat._id}>
//                             <span><b><p>{chat.sender.firstName + " " + chat.sender.lastName}:</p></b></span>
//                             <p>{chat.message}</p>
//                         </div>
//                        )
//                    })
//                 } 
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name='message' value={message} onChange={e => setMessage(e.target.value)} placeholder='add your message here'/>
//                 <input type="submit"/>
//             </form>
//         </div>
//     )
// }

// const mapStateToProps = stateStatus => {
//     return {
//         user : stateStatus.userState.user,
//         chats : stateStatus.chatState.data
//     }
// }


// export default connect(mapStateToProps, { getChats })(ChatPage)
