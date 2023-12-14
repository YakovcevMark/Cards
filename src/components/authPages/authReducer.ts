export type AuthReducerActions = { type: string }
const initialState = {}
type ReducerState = typeof initialState
export const authReducer = (state: ReducerState = initialState, action: AuthReducerActions): ReducerState => {
    switch (action.type) {
        default: {
            return state
        }
    }
}
