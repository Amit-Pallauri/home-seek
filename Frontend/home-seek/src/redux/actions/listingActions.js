import {LISTING_HOUSE,TOGGLE_CREATE_STATE} from '../actionTypes/userActionTypes';
import axios from 'axios';


export const listingHouse = (details) => async (dispatch, getState) => {
    try {
        dispatch({ type: TOGGLE_CREATE_STATE});
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFjMjNjMWFmN2RhNmJlMTIwODM5ZiIsImlhdCI6MTU5NzIzNjQwMywiZXhwIjoxNTk3MzIyODAzfQ.rN2_gOR28OFyMGdGurYgyVGIdsQuuyp7dTSzY9Bxlks'
        }
        const { data } = await axios.post("http://localhost:3000/owner/listing/create", details, {headers: headers})
        console.log(data)
        dispatch({
            type: LISTING_HOUSE,
            payload: data
        })
        
    } catch (err) {
        console.error(err.message);
        dispatch({ type: LISTING_HOUSE, payload: null})
    } finally {
        dispatch({ type: TOGGLE_CREATE_STATE})
    }
}

export const createOTP = (data2) => async (dispatch, getState) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFjMjNjMWFmN2RhNmJlMTIwODM5ZiIsImlhdCI6MTU5NzIzNjQwMywiZXhwIjoxNTk3MzIyODAzfQ.rN2_gOR28OFyMGdGurYgyVGIdsQuuyp7dTSzY9Bxlks'
        }
        const { data } = await axios.post(`http://localhost:3000/owner/listing`, data2, {headers: headers})
        //console.log(data)
        alert("OTP is sent successfully")
    } catch (err) {
        console.error(err.message);
    }
}

export const verifyOTP = (data1) => async (dispatch, getState) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmMmFjMjNjMWFmN2RhNmJlMTIwODM5ZiIsImlhdCI6MTU5NzIzNjQwMywiZXhwIjoxNTk3MzIyODAzfQ.rN2_gOR28OFyMGdGurYgyVGIdsQuuyp7dTSzY9Bxlks'
        }
        const { data } = await axios.post(`http://localhost:3000/owner/listing/verify`, data1 , {headers: headers})
        //console.log(data)
        alert("verification successfull")
    } catch (err) {
        console.error(err.message);
    }
}