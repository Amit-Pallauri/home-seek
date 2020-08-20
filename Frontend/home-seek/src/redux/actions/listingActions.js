import {LISTING_HOUSE,TOGGLE_CREATE_STATE, ERROR} from '../actionTypes/userActionTypes';
import axios from 'axios';
import { SERVER_BASE_URL } from '../../config'


export const listingHouse = (details) => async (dispatch, getState) => {
    try {
        dispatch({ type: TOGGLE_CREATE_STATE});
        const storage = JSON.stringify(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'authorization': storage.token
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/owner/listing/create`, details, {headers: headers})
        console.log(data)
        dispatch({
            type: LISTING_HOUSE,
            payload: data
        })
        
    } catch (err) {
        dispatch({ type: ERROR, payload: err.response.data.message})
    } finally {
        dispatch({ type: TOGGLE_CREATE_STATE})
    }
}

export const createOTP = (data2) => async (dispatch, getState) => {
    try {
        const storage = JSON.stringify(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/owner/listing`, data2, {headers: headers})
        console.log(data)
        alert("OTP is sent successfully")
    } catch (err) {
        console.error(err.message);
    }
}

export const verifyOTP = (data1) => async (dispatch, getState) => {
    try {
        const storage = JSON.stringify(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/owner/listing/verify`, data1 , {headers: headers})
        console.log(data)
        alert("verification successfull")
    } catch (err) {
        console.error(err.message);
    }
}