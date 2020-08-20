import {combineReducers} from 'redux';

import chatReducer from './reducers/chatReducer'
import userReducer from './reducers/userReducer';
import paymentReducer from './reducers/paymentReducer';


const rootReducer = combineReducers({
    userState : userReducer,
    paymentState: paymentReducer,
    chatState : chatReducer
})

export default rootReducer;