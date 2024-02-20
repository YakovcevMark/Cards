import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authApi, UserDataResponse} from "features/authPages/authApi";


export type AppError = string | null;

const initialState = {
    error: null as AppError,
    data: {
        isAppInitialized: false,
        isSuccess: false,
        isError: false,
        userData: {} as UserDataResponse
    }
}

const appSlice = createSlice({
        name: 'app',
        initialState,
        selectors: {
            selectAppError: state => state.error,
            selectAppData:state => state.data
        },
        reducers: {
            setAppError: (state, action: PayloadAction<AppError>) => {
                state.error = action.payload;
            },
        },
    extraReducers: builder => {
            builder
                .addMatcher(authApi.endpoints?.initialize.matchRejected,(s) => {
                    s.data.isAppInitialized = true;
                    s.data.isError = true
                    s.data.isSuccess = false
                    s.data.userData = {} as UserDataResponse
                })
                .addMatcher(authApi.endpoints?.initialize.matchFulfilled, (s, a) => {
                    s.data.isAppInitialized = true;
                    s.data.isError = false
                    s.data.isSuccess = true
                    s.data.userData = a.payload
                })
    }
    })
;
export const {setAppError} = appSlice.actions;
export const {selectAppError, selectAppData} = appSlice.selectors;
export default appSlice.reducer;
