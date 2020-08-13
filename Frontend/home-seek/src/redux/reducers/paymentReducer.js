import {CREATE_PAYMENT,TOGGLE_GET_STATE} from '../actionTypes/paymentActionTypes';

const initialState = {
    order: null,
    isGetting: false
}

const paymentReducer = (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case CREATE_PAYMENT:
            return {...state, order: payload}
        case TOGGLE_GET_STATE:
            return {...state, isGetting: !state.isGetting}
        default:
            return state;
    }
}

export default paymentReducer;