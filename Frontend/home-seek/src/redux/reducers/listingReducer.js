import {LISTING_HOUSE,TOGGLE_CREATE_STATE, ERROR,GETALLPOSTS,GETPARTICULARPOST, TEMP_DETAIL} from '../actionTypes/userActionTypes';
import { SORTED_VALUES, FILTERED_DATA, GET_VERIFIED_POSTS, CREATE_OWNER_REQUEST } from '../actionTypes/postsActions'

const initialState = {
    create: null,
    allHomes: null,
    particularHome: null,
    isCreating: false,
    sortedValues : null,
    errorMessage : null,
    allVerifiedPosts : null
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
        case SORTED_VALUES : 
            return { ...state, sortedValues : payload }
        case FILTERED_DATA:
            return {...state, allHomes : payload}
        case GET_VERIFIED_POSTS:
            return {...state, allVerifiedPosts : payload} 
        case CREATE_OWNER_REQUEST :
            return {...state}
        default:
            return state;
    }
}

export default listingReducer;