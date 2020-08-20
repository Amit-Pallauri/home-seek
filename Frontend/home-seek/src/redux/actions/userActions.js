import {
    REGISTER_USER,
    TOGGLE_AUTH_STATE,
    LOGIN_USER,
    LOGOUT_USER, 
    LOGIN_VIA_THIRDPARTY,
    FORGOT_PASS,
    REVIVE_PASS,
    ERROR
} from '../actionTypes/userActionTypes';
import axios from 'axios';
import {SERVER_BASE_URL} from '../../config'

export const registerUser = (user) => async dispatch =>  {
    try {
        dispatch({ type : TOGGLE_AUTH_STATE });
        const headers = {
            'Content-Type': 'application/json'
          }
        const { data } = await axios.post(`${SERVER_BASE_URL}/signup`, user, {headers: headers})
        console.log(data);
        dispatch({
            type: REGISTER_USER,
            payload: data
        })   
        dispatch({ type : TOGGLE_AUTH_STATE });
    } catch (err) {
        dispatch({
            type : ERROR,
            payload : err.response.data.message
        })
    } finally {
        dispatch({ type: TOGGLE_AUTH_STATE})
    }
}

export const loginUser = user => async (dispatch, getState) =>  {
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
            payload : err.response.data.message
        })
    } finally {
        dispatch({ type: TOGGLE_AUTH_STATE})
    }
}

export const logoutUser = ()  => async dispatch => {
    try {
        const token = JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'authorization' : token.token
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


export const loginViaThirdParty = () => async dispatch => {
    try {
        const { data } = await axios(`${SERVER_BASE_URL}/google`)
        console.log(data)
        dispatch({
            type : LOGIN_VIA_THIRDPARTY
        })
    } catch (error) {
        console.log(error)
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