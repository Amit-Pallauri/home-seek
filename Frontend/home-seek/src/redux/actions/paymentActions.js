import {CREATE_PAYMENT,TOGGLE_GET_STATE} from '../actionTypes/paymentActionTypes';
import axios from 'axios';


export const createPayment = (payment) => async (dispatch, getState) => {
    try {
        dispatch({ type: TOGGLE_GET_STATE});
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFjMjNjMWFmN2RhNmJlMTIwODM5ZiIsImlhdCI6MTU5NzE0MjUyOCwiZXhwIjoxNTk3MjI4OTI4fQ.PrQXKC8iYLJjicd_iUH2thBmWyul7TIAXqw3eVuqFlc'
        }
        const { data } = await axios.post("http://localhost:3000/user/pay", payment, {headers: headers})
        console.log(data)
        dispatch({
            type: CREATE_PAYMENT,
            payload: data
        })
        
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
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFjMjNjMWFmN2RhNmJlMTIwODM5ZiIsImlhdCI6MTU5NzE0MjUyOCwiZXhwIjoxNTk3MjI4OTI4fQ.PrQXKC8iYLJjicd_iUH2thBmWyul7TIAXqw3eVuqFlc'
        }
        const { data } = await axios.post("http://localhost:3000/user/pay/verify", details, {headers: headers})
        console.log(data)
        alert("Payment Successfull")
    } catch (err) {
        console.error(err.message);
        alert(err.message)
    } finally {
        dispatch({ type: TOGGLE_GET_STATE})
    }
} 