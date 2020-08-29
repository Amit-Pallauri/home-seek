import axios from 'axios'
import { TOGGLE_GET_STATE } from '../actionTypes/paymentActionTypes'
import { SERVER_BASE_URL } from '../../config'
import { GET_REQUESTED_POSTS, ERROR } from '../actionTypes/postsActions'

export const getRequestedPosts = () => async dispatch => {
    try {
        dispatch({ type : TOGGLE_GET_STATE })
        const storage =  JSON.parse(localStorage.getItem('user'))
        const headers = {
            'Content-Type': 'application/json',
            'authorization' :  storage.token
        }
        const {data} = await axios.get(`${SERVER_BASE_URL}/userSpecificPosts`, { headers })
        dispatch({
            type : GET_REQUESTED_POSTS,
            payload : data
        })
        dispatch({ type : TOGGLE_GET_STATE })
    } catch (error) {
        dispatch({
            type : ERROR,
            dispatch : error
        })
    }
}