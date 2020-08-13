import {combineReducers} from 'redux';

import userReducer from './reducers/userReducer';
import paymentReducer from './reducers/paymentReducer';


const rootReducer = combineReducers({
    userState : userReducer,
    paymentState: paymentReducer
})

export default rootReducer;