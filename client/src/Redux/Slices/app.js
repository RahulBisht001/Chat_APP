import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT"  //can be CONTACT, SHARED , STARED
    },
    snackbar: {
        open: false,
        message: "",
        severity: ""
    }

}

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        // toggle Sidebar
        toggleSidebar(state, action) {
            state.sidebar.open = !state.sidebar.open
        },
        // Update the Type of Side bar like : Contact / Stared messages / Shared Media
        updateSidebarType(state, action) {
            state.sidebar.type = action.payload.type
        },
        openSnackBar(state, action) {
            console.log("Open snack bar here")
            console.log(action.payload)
            state.snackbar.open = true
            state.snackbar.severity = action.payload.severity
            state.snackbar.message = action.payload.message
        },
        closeSnackBar(state, action) {

            state.snackbar.open = false
            state.snackbar.severity = null
            state.snackbar.message = null
        }
    }
})

// Reducer
export default slice.reducer

export function ToggleSidebar() {
    return async (dispatch, getState) => {
        dispatch(slice.actions.toggleSidebar())
    }
}


export function UpdateSidebarType(type) {
    return async (dispatch, getState) => {
        dispatch(slice.actions.updateSidebarType({ type }))
    }
}

export const showSnackbar = ({ severity, message }) =>
    async (dispatch, getState) => {
        console.log("severity" + severity)
        console.log("message" + message)
        dispatch(
            slice.actions.openSnackBar({
                message: message,
                severity: severity,
            })
        );

        setTimeout(() => {
            dispatch(slice.actions.closeSnackBar());
        }, 8000);
    }


export const closeSnackBar = () => async (dispatch, getState) => {

    dispatch(slice.actions.closeSnackBar({ payload: undefined }));
}