import {combineReducers} from 'redux';

import chatReducer from './reducers/chatReducer'
import userReducer from './reducers/userReducer';
import paymentReducer from './reducers/paymentReducer';
import listingReducer from './reducers/listingReducer';

const rootReducer = combineReducers({
    userState : userReducer,
    paymentState: paymentReducer,
    chatState : chatReducer,
    listingState: listingReducer
})

export default rootReducer;