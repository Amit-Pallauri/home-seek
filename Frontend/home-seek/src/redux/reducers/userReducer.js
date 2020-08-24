import {
	REGISTER_USER,
	LOGIN_USER,
	LOGOUT_USER,
	TOGGLE_AUTH_STATE,
	LOGIN_VIA_THIRDPARTY,
	FORGOT_PASS,
	REVIVE_PASS,
	ERROR,
	VERIFY_OTP
} from '../actionTypes/userActionTypes';

const initialState = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	isAuthenticating: false,
	errorMessage: null
};

const userReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
		case ERROR:
			return {
				...state,
				errorMessage: payload
			};
		case TOGGLE_AUTH_STATE:
			return {
				...state,
				isAuthenticating: !state.isAuthenticating
			};
		case REGISTER_USER:
			return {
				...state
			};
		case LOGIN_USER:
			const userJS = JSON.stringify(payload);
			localStorage.setItem('user', userJS);
			return {
				...state,
				user: payload
			};
		case LOGOUT_USER:
			localStorage.removeItem('user');
			return {
				...state,
				user: null
			};
		case FORGOT_PASS:
			console.log(payload);
			return {
				...state
			};
		case REVIVE_PASS:
			return {
				...state,
				message: payload
			};
		case LOGIN_VIA_THIRDPARTY:
			return {
				...state
			};
		case VERIFY_OTP:
			const userJSON = JSON.stringify(payload);
			localStorage.setItem('user', userJSON);
			return {
				...state,
				user: payload
			};
		default:
			return state;
	}
};

export default userReducer;
