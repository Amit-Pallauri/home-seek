import {LISTING_HOUSE,TOGGLE_CREATE_STATE, ERROR,GETALLPOSTS,GETPARTICULARPOST, TEMP_DETAIL} from '../actionTypes/userActionTypes';

const initialState = {
    create: null,
    allHomes: null,
    particularHome: null,
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
        case GETALLPOSTS:
            return {...state, allHomes: payload}
        case GETPARTICULARPOST:
            return {...state, particularHome: payload}
        default:
            return state;
    }
}

export default listingReducer;