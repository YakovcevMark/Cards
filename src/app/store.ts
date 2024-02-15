
import {configureStore} from "@reduxjs/toolkit";
import appReducer from "app/appSlice";
import {authApi} from "features/authPages/authApi";
import {packsApi} from "features/Packs/packsApi";
import {rtkQueryErrorLogger} from "utils/rtkQueryErrorLogger/rtkQueryErrorLogger";

export const store = configureStore({
    reducer: {
        app: appReducer,
        [authApi.reducerPath]: authApi.reducer,
        [packsApi.reducerPath]: packsApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(packsApi.middleware)
            .concat(rtkQueryErrorLogger)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// @ts-ignore
window.store = store