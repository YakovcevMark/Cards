import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export type AppError = string | null;

const initialState = {
    error: null as AppError,
}

const appSlice = createSlice({
        name: 'app',
        initialState,
        selectors: {
            selectAppError: state => state.error
        },
        reducers: {
            setAppError: (state, action: PayloadAction<AppError>) => {
                state.error = action.payload;
            },
        }
    })
;
export const {setAppError} = appSlice.actions;
export const {selectAppError} = appSlice.selectors;
export default appSlice.reducer;
