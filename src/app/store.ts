
import {configureStore} from "@reduxjs/toolkit";
// import authReducer from "../features/authPages/authSlice";
import appReducer from "./appSlice";
import profileReducer from "../features/profile/profileSlice";
import {authApi} from "../features/authPages/authApi";
import {packsApi} from "../features/Packs/packsApi";

export const store = configureStore({
    reducer: {
        // auth: authReducer,
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