import  {configureStore,getDefaultMiddleware} from '@reduxjs/toolkit';
import reducer from './rootReducer';

const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware()]
})

export default store;