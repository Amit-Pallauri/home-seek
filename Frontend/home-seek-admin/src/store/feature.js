import  {combineReducers} from '@reduxjs/toolkit';
import adminReducer from './adminReducer';
import ownerReducer from './ownerReducer';
import requestReducer from './userRequest';

export default combineReducers({
    admin : adminReducer,
    ownerHomes: ownerReducer,
    requests: requestReducer
})