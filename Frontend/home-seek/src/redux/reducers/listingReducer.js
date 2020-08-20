import {LISTING_HOUSE,TOGGLE_CREATE_STATE, ERROR} from '../actionTypes/userActionTypes';

const initialState = {
    create: null,
    isCreating: false,
    errorMessage : null
}

const listingReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case ERROR :
             return {...state, errorMessage : payload}
        case LISTING_HOUSE:
            return {...state, create: payload}
        case TOGGLE_CREATE_STATE:
            return {...state, isCreating: !state.isCreating}
        default:
            return state;
    }
}

export default listingReducer;