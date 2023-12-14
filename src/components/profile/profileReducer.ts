export type ProfileReducerActions = { type: string }
const initialState = {}
type ReducerState = typeof initialState
export const profileReducer = (state: ReducerState = initialState, action: ProfileReducerActions): ReducerState => {
    switch (action.type) {
        default: {
            return state
        }
    }
}
