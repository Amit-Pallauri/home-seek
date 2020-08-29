import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd'

export const getUserRequests = createAsyncThunk('admin/getUserRequests', async(_,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    //console.log(accessToken)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/userrequests`, {headers: headers})
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const deleteUserRequests = createAsyncThunk('admin/deleteUserRequests', async(requestId,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    //console.log(accessToken)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/delete/userrequests/${requestId}`, {headers: headers})
        message.success("Deleted Successfully")
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const getNormalRequests = createAsyncThunk('admin/getNormalRequests', async(_,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    //console.log(accessToken)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/normalrequests`, {headers: headers})
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const deleteNormalRequests = createAsyncThunk('admin/deleteNormalRequests', async(requestId,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    //console.log(accessToken)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/delete/normalrequests/${requestId}`, {headers: headers})
        message.success("Deleted Successfully")
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const getOwnerRequests = createAsyncThunk('admin/getOwnerRequests', async(_,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    //console.log(accessToken)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/ownerrequests`, {headers: headers})
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const deleteOwnerRequests = createAsyncThunk('admin/deleteOwnerRequests', async(requestId,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    //console.log(accessToken)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/delete/ownerrequests/${requestId}`, {headers: headers})
        message.success("Deleted Successfully")
        return response.data
    } catch (err) {
        console.log(err)
    }
})

const slice = createSlice({
    name: "requestReducer",
    initialState: {
        userRequests:  null,
        normalRequests: null,
        ownerRequests: null,
        isFetching: false,
        deleteRequests: null
    },
    reducers:{},
    extraReducers: {
        [getUserRequests.pending] : (state, action) => {
            state.isFetching = true
        },
        [getUserRequests.fulfilled]: (state, action) => {
            state.userRequests = action.payload;
            state.isFetching = false;
        },
        [getUserRequests.rejected]: (state, action) => {
            state.userRequests = null
            state.isFetching = false;
        },
        [deleteUserRequests.pending] : (state, action) => {
            state.isFetching = true
        },
        [deleteUserRequests.fulfilled]: (state, action) => {
            state.userRequests = action.payload;
            state.isFetching = false;
        },
        [deleteUserRequests.rejected]: (state, action) => {
            state.isFetching = false;
        },
        [getNormalRequests.pending] : (state, action) => {
            state.isFetching = true
        },
        [getNormalRequests.fulfilled]: (state, action) => {
            state.normalRequests = action.payload;
            state.isFetching = false;
        },
        [getNormalRequests.rejected]: (state, action) => {
            state.normalRequests = null
            state.isFetching = false;
        },
        [deleteNormalRequests.pending] : (state, action) => {
            state.isFetching = true
        },
        [deleteNormalRequests.fulfilled]: (state, action) => {
            state.normalRequests = action.payload;
            state.isFetching = false;
        },
        [deleteNormalRequests.rejected]: (state, action) => {
            state.isFetching = false;
        },
        [getOwnerRequests.pending] : (state, action) => {
            state.isFetching = true
        },
        [getOwnerRequests.fulfilled]: (state, action) => {
            state.ownerRequests = action.payload;
            state.isFetching = false;
        },
        [getOwnerRequests.rejected]: (state, action) => {
            state.ownerRequests = null
            state.isFetching = false;
        },
        [deleteOwnerRequests.pending] : (state, action) => {
            state.isFetching = true
        },
        [deleteOwnerRequests.fulfilled]: (state, action) => {
            state.ownerRequests = action.payload;
            state.isFetching = false;
        },
        [deleteOwnerRequests.rejected]: (state, action) => {
            state.isFetching = false;
        },
    }
})

export default slice.reducer;