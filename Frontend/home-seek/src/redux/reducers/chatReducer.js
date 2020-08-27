// import { CHAT_FETCHING, GET_CHATS, CHAT_FETCH_ERROR } from '../actionTypes/chatActionTypes'

// const initialState = {
//     data : [],
//     isFetching : false,
//     error : ''
// }

// const chatReducer = (state = initialState, action) =>{
//     const {type, payload} = action
//     switch (type) {
//         case CHAT_FETCHING :
//             return {...state, isFetching : !state.isFetching}
//         case GET_CHATS:
//             return {...state, data : payload} 
//         case CHAT_FETCH_ERROR : 
//             return {...state, error : payload}
//         // case AFTER_CHATS : 
//         //     return {...state, data : payload}
//         default:
//            return state;
//     }
// }

// export default chatReducer