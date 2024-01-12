// export type AuthReducerActions = { type: string }
// const initialState = {}
// type ReducerState = typeof initialState
// export const authReducer = (state: ReducerState = initialState, action: AuthReducerActions): ReducerState => {
//     switch (action.type) {
//         default: {
//             return state
//         }
//     }
// }
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {authApi} from "../../dal/api";
import {setAppError, setAppStatus, setInitialized} from "../../app/appSlice";
import {RegisterFormData} from "./authApi";

export const login = createAsyncThunk('auth/login', async (payload: RegisterFormData & { rememberMe: boolean; }) => {
    return await authApi.login(payload)
})
export const authorization = createAsyncThunk('auth/login', async (_, {dispatch}) => {
    try {
        return await authApi.getMe()
    } catch (e: any) {
        dispatch(setAppStatus('failed'))
        dispatch(setAppError(e.response.data.error))
    } finally {
        dispatch(setInitialized(true))
    }

})

export const authSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        incremented: state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        decremented: state => {
            state.value -= 1
        },
    },
    // extraReducers: builder => {
    //     builder
    //         .addCase(authorization.rejected, (state, action) => {
    //             // state.status = 'failed'
    //             console.log(action)
    //         })
    // }
})

export const {incremented, decremented} = authSlice.actions
export default authSlice.reducer
