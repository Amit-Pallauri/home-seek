const { GET_REQUESTED_POSTS, ERROR } = require("../actionTypes/postsActions");

const initialState = {
    posts : '',
    errorMessage : ''
}

const postsReducer = (state = initialState, action) => {
    const { type, payload} = action
    switch (type) {
        case GET_REQUESTED_POSTS:
            return {
                ...state, posts : payload
            }
        case ERROR:
            return{
                ...state, errorMessage : payload
            }
        default:
            return state
    }
}

export default postsReducer