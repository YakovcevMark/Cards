
import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../components/authPages/authSlice";
import appReducer from "./appSlice";
import profileReducer from "../components/profile/profileSlice";
import {apiSlice} from "../dal/api/apiSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        profile: profileReducer,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// @ts-ignore
window.store = store