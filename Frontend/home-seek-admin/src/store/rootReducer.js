import  {combineReducers} from '@reduxjs/toolkit';
import featuresReducer from './feature';

export default combineReducers({
    features : featuresReducer
})