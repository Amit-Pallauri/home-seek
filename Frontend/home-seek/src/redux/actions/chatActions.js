// import axios from 'axios';
// import { SERVER_BASE_URL } from '../../config'
// import { GET_CHATS, CHAT_FETCH_ERROR, CHAT_FETCHING } from '../actionTypes/chatActionTypes'
 

// export const getChats =  () => async dispatch => {
//     try {
//         dispatch({type : CHAT_FETCHING})
//         const user = JSON.parse(localStorage.getItem('user'))
//         const headers = {
//             'Content-Type': 'application/json',
//             'authorization' : user.token
//         }
//         const {data} = await axios.get(`${SERVER_BASE_URL}/getChats`, {headers})
//         dispatch({
//             type : GET_CHATS,
//             payload : data
//         })
//         dispatch({type : CHAT_FETCHING})
//     } catch (error) {
//         dispatch({
//             type: CHAT_FETCH_ERROR,
//             paylodad: error
//         })
//     }
// }