import {
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
    TOGGLE_AUTH_STATE,
    LOGIN_VIA_THIRDPARTY,
    FORGOT_PASS,
    REVIVE_PASS,
    ERROR,
    ADD_PROFILE_PIC,
    UPDATE_DETAILS,
	  VERIFY_OTP,
      SERVICE_REQUEST,
      UPDATE_BANK_DETAILS
} from '../actionTypes/userActionTypes';
import { TOGGLE_GET_STATE } from '../actionTypes/paymentActionTypes';

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticating: false,
    errorMessage : null,
    serviceRequests : null,
    isLoading : false
}

const userReducer = (state = initialState, action) => {
    const {
        type,
        payload
    } = action;
    switch (type) {

        
        case ERROR :
            return {
            ...state, errorMessage : payload
            }


        case TOGGLE_AUTH_STATE: 
            return {
                ...state, isAuthenticating : !state.isAuthenticating
            }


        case TOGGLE_GET_STATE:
            return{
                ...state, isLoading : !state.isLoading
            }


        case REGISTER_USER:
            return {
                ...state
            }


        case LOGIN_USER:
            const userJS = JSON.stringify(payload);
            localStorage.setItem("user", userJS);
            return {
                ...state, user: payload
            }


        case LOGOUT_USER:
            localStorage.removeItem("user");
                return {
                    ...state, user: null
                }


        case FORGOT_PASS:
            return {
                ...state
            } 


        case REVIVE_PASS:
            return {
                ...state, message : payload
            } 


        case LOGIN_VIA_THIRDPARTY:
            const userJs = JSON.stringify(payload)
            localStorage.setItem('user', userJs)
            return {
                ...state, user : payload 
            }


        case ADD_PROFILE_PIC : 
            return {
                ...state, user : payload
            }


        case UPDATE_DETAILS : 
            const updatedData = JSON.stringify(payload);
            localStorage.setItem('user', updatedData);
            return {
                ...state, user : payload
            }

        case VERIFY_OTP:
            const userJSON = JSON.stringify(payload);
            localStorage.setItem('user', userJSON);
            return {
              ...state,
              user: payload
            };

        case SERVICE_REQUEST:
            return {
                ...state, serviceRequests : payload
            }

        case UPDATE_BANK_DETAILS :
            const updatedBankDetails = JSON.stringify(payload);
            localStorage.setItem('user', updatedBankDetails);
            return {
                ...state, user : payload
            }

        default:
            return state;
    }
}

export default userReducer;
