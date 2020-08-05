import {combineReducers} from 'redux';

import userReducer from './reducers/userReducer';


const rootReducer = combineReducers({
    userState : userReducer
})

export default rootReducer;