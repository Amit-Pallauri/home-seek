import {combineReducers} from 'redux';

// import chatReducer from './reducers/chatReducer'
import userReducer from './reducers/userReducer';
import paymentReducer from './reducers/paymentReducer';
import postsReducer from './reducers/requestsReducer'
import listingReducer from './reducers/listingReducer';

const rootReducer = combineReducers({
    userState : userReducer,
    paymentState: paymentReducer,
    // chatState : chatReducer,
    postsState : postsReducer,
    listingState: listingReducer
})

export default rootReducer;