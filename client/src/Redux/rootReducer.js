import { combineReducers } from "redux"
import storage from 'redux-persist/lib/storage'


import appReducer from './Slices/app'
import authReducer from "./Slices/auth";

// Slices

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whiteList: ["auth", "app"]
    //BlackList : []
}

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
})

export { rootPersistConfig, rootReducer }

