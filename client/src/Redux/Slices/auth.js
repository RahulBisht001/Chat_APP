import { createSlice } from "@reduxjs/toolkit";

//^ this is axios Instance from HTTP folder
//^ (await axios.post("/auth/login")) it is like this because we already
//^ configured the Base URL from axiosInstance

import axios from '../../HTTP/axios';



const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
}

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = action.payload.isLoggedIn
            state.token = action.payload.token
        },
        signOut(state, action) {
            state.isLoggedIn = false
            state.token = ""
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
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


export function logOutUser() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.signOut())
    }
}