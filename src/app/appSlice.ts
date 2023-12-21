import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authorization} from "../features/authPages/authSlice";

type AppStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
type AppError = string | null;

const initialState = {
    status: 'idle' as AppStatus,
    error: null as AppError,
    isInitialized: false
}

const appSlice = createSlice({
        name: 'app',
        initialState,
        reducers: {
            setAppStatus: (state, action: PayloadAction<AppStatus>) => {
                state.status = action.payload;
            },
            setAppError: (state, action: PayloadAction<AppError>) => {
                state.error = action.payload;
            },
            setInitialized: (state, action: PayloadAction<boolean>) => {
                state.isInitialized = action.payload;
            }
        },
        extraReducers: builder => {
            builder
                .addCase(authorization.pending, (state, action) => {
                    state.status = 'loading'
                })
                .addCase(authorization.fulfilled, (state, action) => {
                    state.status = 'idle'
                })
                .addCase(authorization.rejected, (state, action: any) => {
                    state.status = 'failed'
                })
        }
    })
;
export const {setAppStatus, setAppError, setInitialized} = appSlice.actions;
export default appSlice.reducer;
