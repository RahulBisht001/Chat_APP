import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from '../Store'


const initialState = {
    sidebar: {
        open: false,
        type: "CONTACT"  //can be CONTACT, SHARED , STARED
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
    }
})

// Reducer 
export default slice.reducer

export function ToggleSidebar() {
    return async () => {
        dispatch(slice.actions.toggleSidebar())
    }
}


export function UpdateSidebarType(type) {
    return async () => {
        dispatch(slice.actions.updateSidebarType({ type }))
    }
}