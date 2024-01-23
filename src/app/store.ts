
import {configureStore} from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import profileReducer from "../features/Profile/profileSlice";
import {authApi} from "features/authPages/authApi";
import {packsApi} from "features/Packs/packsApi";

export const store = configureStore({
    reducer: {
        app: appReducer,
        profile: profileReducer,
        [authApi.reducerPath]: authApi.reducer,
        [packsApi.reducerPath]: packsApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(packsApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// @ts-ignore
window.store = store