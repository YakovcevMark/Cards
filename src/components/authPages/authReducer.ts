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
import {createSlice} from "@reduxjs/toolkit"

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
        }
    }
})


export const { incremented, decremented } = authSlice.actions
export default authSlice.reducer
