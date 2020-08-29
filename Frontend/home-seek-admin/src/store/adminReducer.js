import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd'

export const registration = createAsyncThunk('admin/registration', async(data) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/register`, data, {headers: headers})
        console.log(response.data)
        message.success("Registeration Successfull")
        return response.data
    } catch (err) {
        console.log(err)
        message.warning("Registeration UnSuccessfull")
    }
})

export const logIn = createAsyncThunk('admin/logIn', async(data) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/login`, data, {headers: headers})
        console.log(response.data)
        message.success("Login Successfull")
        return response.data
    } catch (err) {
        console.log(err)
        message.warning("Login UnSuccessfull")
    }
})

export const logOut = createAsyncThunk('admin/logOut', async(_,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/admin/logOut`, {headers: headers})
        //console.log(response.data)
        message.success("LogOut Successfull")
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const profile = createAsyncThunk('admin/profile', async(_,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/profile`, {headers: headers})
        //console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})


const slice = createSlice({
    name: "adminReducer",
    initialState: {
        admin: JSON.parse(localStorage.getItem('admin')) || null,
        adminDetails: null,
        isAuthenticating: false
    },
    reducers:{},
    extraReducers: {
        [registration.pending] : (state, action) => {
            state.isAuthenticating = true
        },
        [registration.fulfilled]: (state, action) => {
            const adminJSON = JSON.stringify(action.payload.data.accessToken);
            localStorage.setItem("admin", adminJSON);
            state.admin = action.payload;
            state.isAuthenticating = false;
        },
        [registration.rejected]: (state, action) => {
            state.admin = null
            state.isAuthenticating = false;
        },
        [logIn.pending] : (state, action) => {
            state.isAuthenticating = true
        },
        [logIn.fulfilled]: (state, action) => {
            const adminJSON = JSON.stringify(action.payload.token);
            localStorage.setItem("admin", adminJSON);
            state.admin = action.payload;
            state.isAuthenticating = false;
        },
        [logIn.rejected]: (state, action) => {
            state.admin = null
            state.isAuthenticating = false;
        },
        [logOut.pending] : (state, action) => {
            state.isAuthenticating = true
        },
        [logOut.fulfilled]: (state, action) => {
            state.admin = null;
            state.isAuthenticating = false;
        },
        [logOut.rejected]: (state, action) => {
            state.admin = null
            state.isAuthenticating = false;
        },
        [profile.pending] : (state, action) => {
            state.isAuthenticating = true
        },
        [profile.fulfilled]: (state, action) => {
            state.adminDetails = action.payload;
            state.isAuthenticating = false;
        },
        [profile.rejected]: (state, action) => {
            state.adminDetails = null
            state.isAuthenticating = false;
        }
    }
})

export default slice.reducer;