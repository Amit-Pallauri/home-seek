import {REGISTER_USER,LOGIN_USER,LOGOUT_USER,TOGGLE_AUTH_STATE} from '../actionTypes/userActionTypes';


const initialState= {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticating: false
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_USER:
            const userJSON = JSON.stringify(payload);
            localStorage.setItem("user", userJSON);
            return { ...state, user: payload}
        case TOGGLE_AUTH_STATE:
            return {...state, isAuthenticating: !state.isAuthenticating}
        case LOGIN_USER:
            const userJS = JSON.stringify(payload);
            localStorage.setItem("user", userJS);
            return { ...state, user: payload}
        case LOGOUT_USER:
            localStorage.removeItem("user");
            return {...state, user: null}
        default:
            return state;
    }
}

export default userReducer;