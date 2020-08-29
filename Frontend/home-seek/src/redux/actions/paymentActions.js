import {CREATE_PAYMENT,TOGGLE_GET_STATE,PAYMENT_SUCCESS} from '../actionTypes/paymentActionTypes';
import axios from 'axios';
import { SERVER_BASE_URL } from '../../config'
import { notification } from 'antd'

export const createPayment = (payment) => async (dispatch, getState) => {
    try {
        dispatch({ type: TOGGLE_GET_STATE});
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/user/pay`, payment, {headers: headers})
        //console.log(data)
        dispatch({
            type: CREATE_PAYMENT,
            payload: data
        })
        notification.success({
            message : "request received",
            description :"you can proceesd with the payment now!",
            duration : 3
        })
    } catch (err) {
        console.error(err.message);
        dispatch({ type: CREATE_PAYMENT, payload: null})
    } finally {
        dispatch({ type: TOGGLE_GET_STATE})
    }
}

export const verifytokenPayments = (details) => async(dispatch, getState) => {
    try {
        dispatch({ type: TOGGLE_GET_STATE});
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/user/tokenpay/verify`, details, {headers: headers})
        //console.log(data)
        dispatch({
            type: PAYMENT_SUCCESS,
            payload: data
        })
        notification.success({
            message : "request received",
            description :"Payment Successfull",
            duration : 3
        })
    } catch (err) {
        console.error(err.message);
        alert("Payment Unsuccessfull")
    } finally {
        dispatch({ type: TOGGLE_GET_STATE})
    }
} 

export const verifyDepositPayments = (details) => async(dispatch, getState) => {
    try {
        dispatch({ type: TOGGLE_GET_STATE});
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/user/depositpay/verify`, details, {headers: headers})
        console.log(data)
        dispatch({
            type: PAYMENT_SUCCESS,
            payload: data
        })
        notification.success({
            message : "request received",
            description :"Payment Successfull",
            duration : 3
        })
    } catch (err) {
        console.error(err.message);
        notification.warning({
            message : "Error",
            description :"Sorry!! Payment couldn't be processed",
            duration : 3
        })
    } finally {
        dispatch({ type: TOGGLE_GET_STATE})
    }
} 

export const verifyRentPayments = (details) => async(dispatch, getState) => {
    try {
        dispatch({ type: TOGGLE_GET_STATE});
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/user/rentpay/verify`, details, {headers: headers})
        console.log(data)
        dispatch({
            type: PAYMENT_SUCCESS,
            payload: data
        })
        notification.success({
            message : "request received",
            description :"Payment Successfull",
            duration : 3
        })
    } catch (err) {
        console.error(err.message);
        notification.warning({
            message : "Error",
            description :"Sorry!! Payment couldn't be processed",
            duration : 3
        })
    } finally {
        dispatch({ type: TOGGLE_GET_STATE})
    }
} 