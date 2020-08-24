import {combineReducers} from 'redux';

import chatReducer from './reducers/chatReducer'
import userReducer from './reducers/userReducer';
import paymentReducer from './reducers/paymentReducer';
import postsReducer from './reducers/postsReducer'

const rootReducer = combineReducers({
    userState : userReducer,
    paymentState: paymentReducer,
    chatState : chatReducer,
    postsState : postsReducer
})

export default rootReducer;