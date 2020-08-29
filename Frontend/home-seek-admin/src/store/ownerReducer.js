import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { message } from 'antd'

export const verifyHomes = createAsyncThunk('admin/verifyHomes', async(_,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    //console.log(accessToken)
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/owner/listings`, {headers: headers})
        //console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const createHomes = createAsyncThunk('admin/createHomes', async({homeId, data},{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    try {
        const headers = {
            'Content-Type': 'application/json;text/html; charset=UTF-8;multipart/form-data; boundary=something',
            'Authorization': accessToken
        }
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/owner/listing/home/${homeId}`, data , {headers: headers})
        //console.log(response.data)
        message.success("Home Updated Successfully")
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const deleteHomes = createAsyncThunk('admin/deleteHomes', async(homeId,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    try {
        const headers = {
            'Content-Type': 'application/json;text/html; charset=UTF-8;multipart/form-data; boundary=something',
            'Authorization': accessToken
        }
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/owner/listing/home/delete/${homeId}`, {headers: headers})
        message.success("Deleted Successfully")
        //console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const deletePosts = createAsyncThunk('admin/deletePosts', async(postId,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    try {
        const headers = {
            'Content-Type': 'application/json;text/html; charset=UTF-8;multipart/form-data; boundary=something',
            'Authorization': accessToken
        }
        const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/owner/listing/delete/${postId}`, {headers: headers})
        console.log(response.data)
        message.success("Deleted Successfully")
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const particularHome = createAsyncThunk('admin/particularHome', async(homeId,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    try {
        const headers = {
            'Content-Type': 'application/json;text/html; charset=UTF-8;multipart/form-data; boundary=something',
            'Authorization': accessToken
        }
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/owner/home/${homeId}`, {headers: headers})
        //console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const updateHomes = createAsyncThunk('admin/updateHomes', async({homeId, data},{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    try {
        const headers = {
            'Content-Type': 'application/json;text/html; charset=UTF-8;multipart/form-data; boundary=something',
            'Authorization': accessToken
        }
        const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/owner/listing/home/update/${homeId}`, data , {headers: headers})
        //console.log(response.data)
        alert("updated Successfully")
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const historyOfUser = createAsyncThunk('admin/historyOfUser', async(_,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    try {
        const headers = {
            'Content-Type': 'application/json;text/html; charset=UTF-8;multipart/form-data; boundary=something',
            'Authorization': accessToken
        }
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getAllUsersWithHome`, {headers: headers})
        //console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})

export const findUserWithHome = createAsyncThunk('admin/findUserWithHome', async(userId,{getState}) => {
    const accessToken = JSON.parse(localStorage.getItem("admin"))
    try {
        const headers = {
            'Content-Type': 'application/json;text/html; charset=UTF-8;multipart/form-data; boundary=something',
            'Authorization': accessToken
        }
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/getUserWithHome`, {headers: headers, params : { userId }})
        //console.log(response.data)
        return response.data
    } catch (err) {
        console.log(err)
    }
})


const slice = createSlice({
    name: "ownerReducer",
    initialState: {
        homes:  null,
        particularHome: null,
        historyOfUser: null,
        findUserWithHome: null,
        isFetching: false
    },
    reducers:{},
    extraReducers: {
        [verifyHomes.pending] : (state, action) => {
            state.isFetching = true
        },
        [verifyHomes.fulfilled]: (state, action) => {
            state.homes = action.payload;
            state.isFetching = false;
        },
        [verifyHomes.rejected]: (state, action) => {
            state.homes = null
            state.isFetching = false;
        },
        [createHomes.pending] : (state, action) => {
            state.isFetching = true
        },
        [createHomes.fulfilled]: (state, action) => {
            state.isFetching = false;
        },
        [createHomes.rejected]: (state, action) => {
            state.isFetching = false;
        },
        [deleteHomes.pending] : (state, action) => {
            state.isFetching = true
        },
        [deleteHomes.fulfilled]: (state, action) => {
            state.isFetching = false;
        },
        [deleteHomes.rejected]: (state, action) => {
            state.isFetching = false;
        },
        [particularHome.pending] : (state, action) => {
            state.isFetching = true
        },
        [particularHome.fulfilled]: (state, action) => {
            state.particularHome = action.payload
            state.isFetching = false;
        },
        [particularHome.rejected]: (state, action) => {
            state.isFetching = false;
        },
        [updateHomes.pending] : (state, action) => {
            state.isFetching = true
        },
        [updateHomes.fulfilled]: (state, action) => {
            state.isFetching = false;
        },
        [updateHomes.rejected]: (state, action) => {
            state.isFetching = false;
        },
        [deletePosts.pending] : (state, action) => {
            state.isFetching = true
        },
        [deletePosts.fulfilled]: (state, action) => {
            state.homes = action.payload;
            state.isFetching = false;
        },
        [deletePosts.rejected]: (state, action) => {
            state.isFetching = false;
        },
        [historyOfUser.pending] : (state, action) => {
            state.isFetching = true
        },
        [historyOfUser.fulfilled]: (state, action) => {
            state.historyOfUser = action.payload;
            state.isFetching = false;
        },
        [historyOfUser.rejected]: (state, action) => {
            state.isFetching = false;
        },
        [findUserWithHome.pending] : (state, action) => {
            state.isFetching = true
        },
        [findUserWithHome.fulfilled]: (state, action) => {
            state.findUserWithHome = action.payload;
            state.isFetching = false;
        },
        [findUserWithHome.rejected]: (state, action) => {
            state.isFetching = false;
        },
    }
})

export default slice.reducer;