
import {configureStore} from "@reduxjs/toolkit";
import appReducer from "app/appSlice";
import {authApi} from "features/authPages/authApi";
import {packsApi} from "features/Packs/packsApi";
import {rtkQueryErrorLogger} from "utils/rtkQueryErrorLogger/rtkQueryErrorLogger";
import {cardsApi} from "features/Packs/Cards/cardsApi";

export const store = configureStore({
    reducer: {
        app: appReducer,
        [authApi.reducerPath]: authApi.reducer,
        [packsApi.reducerPath]: packsApi.reducer,
        [cardsApi.reducerPath]: cardsApi.reducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(packsApi.middleware)
            .concat(cardsApi.middleware)
            .concat(rtkQueryErrorLogger)
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// @ts-ignore
window.store = store