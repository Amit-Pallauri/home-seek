import {CREATE_PAYMENT,TOGGLE_GET_STATE,PAYMENT_SUCCESS} from '../actionTypes/paymentActionTypes';
import axios from 'axios';


export const createPayment = (payment) => async (dispatch, getState) => {
    try {
        dispatch({ type: TOGGLE_GET_STATE});
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.post("http://localhost:3000/user/pay", payment, {headers: headers})
        console.log(data)
        dispatch({
            type: CREATE_PAYMENT,
            payload: data
        })
        alert("Booking is done Please pay the Rent")
    } catch (err) {
        console.error(err.message);
        dispatch({ type: CREATE_PAYMENT, payload: null})
    } finally {
        dispatch({ type: TOGGLE_GET_STATE})
    }
}

export const verifyPayments = (details) => async(dispatch, getState) => {
    try {
        dispatch({ type: TOGGLE_GET_STATE});
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.post("http://localhost:3000/user/pay/verify", details, {headers: headers})
        console.log(data)
        dispatch({
            type: PAYMENT_SUCCESS,
            payload: data
        })
        alert("Payment Successfull")
    } catch (err) {
        console.error(err.message);
        alert("Payment Unsuccessfull")
    } finally {
        dispatch({ type: TOGGLE_GET_STATE})
    }
} 