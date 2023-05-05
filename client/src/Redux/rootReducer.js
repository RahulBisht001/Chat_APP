import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";


import appReducer from './Slices/app'

// Slices

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-'
    //whiteList : []
    //BlackList : []

}

const rootReducer = combineReducers({
    app: appReducer,
})

export { rootPersistConfig, rootReducer }