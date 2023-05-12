import { createSlice } from "@reduxjs/toolkit";

//^ this is axios Instance from HTTP folder
//^ (await axios.post("/auth/login")) it is like this because we already
//^ configured the Base URL from axiosInstance

import axios from '../../HTTP/axios';
import { showSnackbar } from "./app";



const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
    email: '',
    error: false,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateIsLoading(state, action) {
            state.error = action.payload.error
            state.isLoading = action.payload.isLoading
        },
        login(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        signOut(state, action) {
            state.isLoggedIn = false
            state.token = ""
        },
        updateRegisterEmail(state, action) {
            state.email = action.payload.email
        }
    }
})

//reducer
export default slice.reducer

export function loginUser(formValues) {
    //formValues = {email , password}
    return async (dispatch, getState) => {
        await axios.post("/auth/login",
            { ...formValues },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                console.log(res)
                dispatch(slice.actions.login({
                    isLoggedIn: true,
                    token: res.data.token,
                }))
                console.log("Hi Rahul")
                dispatch(showSnackbar({ severity: 'success', message: res.data.message }))
            })
            .catch((err) => {
                console.log(err)
                dispatch(showSnackbar({ severity: 'error', message: err.response.data.message }))
            })
    }
}


export function logOutUser() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.signOut())
    }
}

export function ForgotPassword(formValues) {
    return async (dispatch, getState) => {
        await axios.post('/auth/forgot-password',
            { ...formValues },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            },)
            .then((res) => {
                console.log(res)
                dispatch(showSnackbar({ severity: "success", message: res.data.message }))
            })
            .catch((err) => {
                console.log(err)
                dispatch(showSnackbar({ severity: 'error', message: err.response.data.message }))
            })
    }
}


export function NewPassword(formValues) {
    return async (dispatch, getState) => {
        axios.post('/auth/reset-password',
            { ...formValues },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((res) => {
                console.log(res)
                dispatch(slice.actions.login({
                    isLoggedIn: true,
                    token: res.data.token,
                }))
                dispatch(showSnackbar({ severity: 'success', message: res.data.message }))
            })
            .catch((err) => {
                console.log(err)
                dispatch(showSnackbar({ severity: 'error', message: err.response.data.message }))
            })
    }
}

export function RegisterUser(formValues) {
    return async (dispatch, getState) => {


        dispatch(slice.actions.updateIsLoading({ isLoading: true, error: false }))

        await axios.post('/auth/register',
            { ...formValues },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((res) => {
                dispatch(slice.actions.updateRegisterEmail({ email: formValues.email }))
                dispatch(slice.actions.updateIsLoading({ isLoading: false, error: false }))
                dispatch(showSnackbar({ severity: "success", message: res.data.message }))
                console.log(res)
            })
            .catch((err) => {
                dispatch(showSnackbar({ severity: 'error', message: err.response.data.message }))
                dispatch(slice.actions.updateIsLoading({ error: true, isLoading: false }))
                console.log(err)
            })
            .finally(() => {
                if (!getState().auth.error)
                    window.location.href = '/auth/verify'
            })
    }
}

export function VerifyEmail(formValues) {
    return async (dispatch, getState) => {
        await axios.post('/auth/verify',
            { ...formValues },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((res) => {
                console.log(res)
                dispatch(slice.actions.login({
                    isLoggedIn: true,
                    token: res.data.token,
                }))
                dispatch(showSnackbar({ severity: 'success', message: res.data.message }))
            })
            .catch((err) => {
                console.log(err)
                dispatch(showSnackbar({ severity: 'error', message: err.response.data.message }))
            })
    }
}