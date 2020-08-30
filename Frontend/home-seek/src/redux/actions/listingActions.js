import {LISTING_HOUSE,TOGGLE_CREATE_STATE, ERROR,GETALLPOSTS,GETPARTICULARPOST, TEMP_DETAIL} from '../actionTypes/userActionTypes';
import {VERIFY_OTP} from '../actionTypes/userActionTypes';
import {SORTED_VALUES, FILTERED_DATA, CREATE_OWNER_REQUEST, GET_VERIFIED_POSTS} from '../actionTypes/postsActions'
import axios from 'axios';
import { SERVER_BASE_URL } from '../../config'
import { message, notification } from 'antd';


export const listingHouse = (details) => async (dispatch, getState) => {
    try {
        dispatch({ type: TOGGLE_CREATE_STATE});
        const storage = JSON.parse(localStorage.getItem("user"))
        const headers = {
            'Content-Type': 'application/json',
            'authorization': storage.token
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/owner/listing/create`, details, {headers: headers})
        //console.log(data)
        dispatch({
            type: LISTING_HOUSE,
            payload: data
        })
		notification.success({
            message: 'Request received',
            description:
              'your request has been added successfully. Home seek team will reach out to you soon. Thank you!!',
            duration : 3
        });  
    } catch (err) {
        dispatch({ type: ERROR, payload: err})
        notification.warning({
            message: 'Error',
            description :'ERROR while creating your request!!',
            duration : 3
        })
    } finally {
        dispatch({ type: TOGGLE_CREATE_STATE})
    }
}

export const createOTP = (data2) => async (dispatch, getState) => {
    try {
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/owner/listing`, data2, {headers: headers})
        //console.log(data)
        message.success("OTP has sent successfully")
    } catch (err) {
        console.error(err.message);
    }
}

export const verifyOTP = (data1) => async (dispatch, getState) => {
    try {
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/owner/listing/verify`, data1 , {headers: headers})
        dispatch({
            type: VERIFY_OTP,
            payload: data
        })
        //console.log(data)
        message.success("verification successfull")
    } catch (err) {
        console.error(err.message);
    }
}

export const allHomes = () => async (dispatch, getState) => {
    try {
            dispatch({ type: TOGGLE_CREATE_STATE});
            const storage = JSON.parse(localStorage.getItem('user'))
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': storage.token
            }
            const { data } = await axios.get(`${SERVER_BASE_URL}/listings`, {headers: headers})
            dispatch({
                type: GETALLPOSTS,
                payload: data
            })
    } catch (err) {
        dispatch({ type: ERROR, payload: err})
        console.error(err.message);
    }finally {
        dispatch({ type: TOGGLE_CREATE_STATE})
    }
}

export const particularHome = (homeId) => async (dispatch) => {
    try {
        dispatch({ type: TOGGLE_CREATE_STATE});
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.get(`${SERVER_BASE_URL}/owner/home/${homeId}`, {headers: headers})
        //console.log(homeId)
        dispatch({
            type: GETPARTICULARPOST,
            payload: data
        })
    } catch (err) {
        dispatch({ type: ERROR, payload: err})
        console.error(err.message);
    }finally {
        dispatch({ type: TOGGLE_CREATE_STATE})
    }
}

export const getAllSortedPosts = () => async dispatch => {
   try {
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
       const { data } = await axios.get(`${SERVER_BASE_URL}/getAllSortedPosts`, {headers})
       dispatch({
           type :  SORTED_VALUES,
           payload : data
       })
   } catch (error) {
       dispatch({
           type : ERROR,
           payload : error
       })
   } 
}

export const getFilteredData = details => async dispatch => {
    try {
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { location, maxRent, minRent, type } = details
        // const { location } = details
        const { data } = await axios.get(`${SERVER_BASE_URL}/filter`, { headers, params: { 
            location,
            maxRent, 
            minRent,
            type 
         }})
         console.log(data)
        dispatch({
            type :  FILTERED_DATA,
            payload : data
        })     
    } catch (error) {
        dispatch({
            type : ERROR,
            payload : error
        })
    }
}

export const getAllVerifiedPosts = () => async dispatch => {
    try {
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.get(`${SERVER_BASE_URL}/getAllPostedListings`, {headers})
        dispatch({
            type : GET_VERIFIED_POSTS,
            payload : data
        })
    } catch (error) {
        dispatch({
            type : ERROR,
            payload : error
        })
    }
}

export const createOwnerRequests = details => async dispatch => {
    try {
        const storage = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': storage.token
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/createOwnerRequests`, details, {headers})
        // message.success('your request has been added successfully. Home seek team will reach out to you soon. Thank you!!')
        notification.success({
            message: 'Request received',
            description:
              'your request has been added successfully. Home seek team will reach out to you soon. Thank you!!',
            duration : 3
        });
        dispatch({
            type : CREATE_OWNER_REQUEST,
            payload : data
        })
    } catch (error) {
        notification.warning({
            message: 'Error',
            description :'ERROR while creating your request!!',
            duration : 3
        })
        dispatch({
            type : ERROR,
            payload : error
        })
    }
}