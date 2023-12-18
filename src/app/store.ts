// import {applyMiddleware, combineReducers, createStore} from "redux";
// import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";
// import {authReducer, AuthReducerActions} from "../components/authPages/authReducer";
// import {appReducer, AppReducerActions} from "./appReducer";
// import {profileReducer, ProfileReducerActions} from "../components/profile/profileReducer";
//
// const rootReducer = combineReducers({
//     auth: authReducer,
//     app: appReducer,
//     profile: profileReducer
// })
//
// export const store = createStore(rootReducer, applyMiddleware(thunk))
// type AppActionsType =
//     | AuthReducerActions
//     | AppReducerActions
//     | ProfileReducerActions
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>
// @ts-ignore
// window.store = store
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../components/authPages/authReducer";
import appReducer from "./appReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// @ts-ignore
window.store = store