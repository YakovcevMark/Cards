// export type AppReducerActions = { type: string }
// const initialState = {}
// type ReducerState = typeof initialState
// export const appReducer = (state: ReducerState = initialState, action: AppReducerActions): ReducerState => {
//     switch (action.type) {
//         default: {
//             return state
//         }
//     }
// }

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
type AppStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as AppStatus
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppStatus: (state, action:PayloadAction<AppStatus>) => {
            state.status = action.payload;
        }
    }
});
export const {setAppStatus} = appSlice.actions;
export default appSlice.reducer;
