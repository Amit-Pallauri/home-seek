import {
    REGISTER_USER,
    TOGGLE_AUTH_STATE,
    LOGIN_USER,
    LOGOUT_USER, 
    LOGIN_VIA_THIRDPARTY,
    FORGOT_PASS,
    REVIVE_PASS,
    ERROR, 
    ADD_PROFILE_PIC,
    UPDATE_DETAILS,
    SERVICE_REQUEST,
    NORMAL_REQUEST,
    UPDATE_BANK_DETAILS
} from '../actionTypes/userActionTypes';
import axios from 'axios';
import {SERVER_BASE_URL} from '../../config'
import { TOGGLE_GET_STATE } from '../actionTypes/paymentActionTypes';

export const registerUser = user => async dispatch =>  {
    try {
        dispatch({ type : TOGGLE_AUTH_STATE });
        const headers = {
            'Content-Type': 'application/json'
          }
        const { data } = await axios.post(`${SERVER_BASE_URL}/signup`, user, {headers: headers})
        dispatch({
            type: REGISTER_USER,
            payload: data
        })   
        dispatch({ type : TOGGLE_AUTH_STATE });
    } catch (err) {
        dispatch({
            type : ERROR,
            payload : err
        })
    } finally {
        dispatch({ type: TOGGLE_AUTH_STATE})
    }
}

export const loginUser = user => async (dispatch) =>  {
    try {
        dispatch({ type : TOGGLE_AUTH_STATE });
        const headers = {
            'Content-Type': 'application/json'
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/signIn`, user, {headers: headers});
        console.log('data', data)
        dispatch({
            type: LOGIN_USER,
            payload: data
        })
        dispatch({ type : TOGGLE_AUTH_STATE });
    } catch (err) {
        err.name === Error ? dispatch({
            type : ERROR,
            payload : "invalid credentials"
        }) : 
        dispatch({
            type : ERROR,
            payload : err
        })
    } finally {
        dispatch({ type: TOGGLE_AUTH_STATE})
    }
}

export const logoutUser = ()  => async dispatch => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'authorization' : user.token
        }
        const { data } = await axios.delete(`${SERVER_BASE_URL}/signOut`, { headers : headers })
        console.log(data)
        dispatch({
            type : LOGOUT_USER
        })
    } catch (error) {
        console.log(error)
    }
}

export const loginViaThirdParty = details => async dispatch => {
    try {
        const headers = {
            'Content-type' : 'application/json'
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/thirdPartysignIn`, {details} , {headers})
        dispatch({
            type : LOGIN_VIA_THIRDPARTY,
            payload : data
        })
    } catch (error) {
       dispatch({
           type : ERROR,
           payload : error
       })
    }
}

export const forgotPassword = email => async dispatch => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const {data} = await axios.post(`${SERVER_BASE_URL}/forgotPassword`,{email}, { headers })
        dispatch({
            type : FORGOT_PASS,
            payload : data
        })
    } catch (error) {
        console.log(error)
    }
}

export const revivePassword = (token, passwordData) => async dispatch => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const { newPassword, confirmPassword } = passwordData 
        const {data} = await axios.post(
            `${SERVER_BASE_URL}/revivePassword/${token}`,
            { newPassword, confirmPassword }, 
            { headers }
        )
        console.log(data)
        dispatch({
            type : REVIVE_PASS,
            payload : data
        })
    } catch (error) {
        console.log(error)
    }
}

export const addProfilepic = state => async dispatch => {
    try {
        dispatch({ type : TOGGLE_GET_STATE })
        const user = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'authorization' : user.token
        }
        const { image }  = state
        const { data } = await axios.post(`${SERVER_BASE_URL}/uploadPic`, {image}, { headers })
        dispatch({
            type : ADD_PROFILE_PIC,
            payload : data
        })
        dispatch({ type : TOGGLE_GET_STATE })
    } catch (error) {
        dispatch({
            type : ERROR,
            payload : error
        })
    }
}

export const updateProfile = details => async dispatch => {
    try {
        dispatch({ type : TOGGLE_GET_STATE })
        const user = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-type' : 'application/json',
            'authorization' : user.token
        }
        const { DOB, gender, city, district, state, pincode, maritalStatus } = details
        const Address = {
            city, district, state, pincode
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/addDetails`, { DOB, gender, Address, maritalStatus }, { headers })
        dispatch({
            type : UPDATE_DETAILS,
            payload : data
        })
        dispatch({ type : TOGGLE_GET_STATE })
    } catch (error) {
        dispatch({
            type : ERROR,
            payload : error
        })
    }
}

export const addServiceRequest  =  req => async dispatch => {
    try {
        const { request, description } = req
        const user = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-type' : 'application/json',
            'authorization' : user.token
        }
        const { data } = await axios.post(`${SERVER_BASE_URL}/user/request`, { request, description }, {headers})
        dispatch({
            type : SERVICE_REQUEST,
            payload : data  
        })
    } catch (error) {
        dispatch({
            type : ERROR,
            payload : error
        })
    }
}

export const addNormalRequest  =  req => async dispatch => {
    try {
        const user = JSON.parse(localStorage.getItem('user'))
                const headers = {
                    'Content-type' : 'application/json',
                    'authorization' : user.token
                }
        const { data } = await axios.post(`${SERVER_BASE_URL}/user/book/request`, req , {headers})
        dispatch({
            type : NORMAL_REQUEST,
            payload : data  
        })
        alert("Booking Visit is confirmed, our team will contact you")
    }catch(error){
      dispatch({
            type : ERROR,
            payload : error
        })
    }
}
    export const updateBankDetails = details => async dispatch => {
            try {
                const user = JSON.parse(localStorage.getItem('user'))
                const headers = {
                    'Content-type' : 'application/json',
                    'authorization' : user.token
                }
        const { data } = await axios.post(`${SERVER_BASE_URL}/updateBankDetails`, { details }, { headers })
        dispatch({
            type : UPDATE_BANK_DETAILS,
            payload : data  
        })
    } catch (error) {
        dispatch({
            type : ERROR,
            payload : error
        })
    }
}