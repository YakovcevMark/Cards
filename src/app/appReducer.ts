export type AppReducerActions = { type: string }
const initialState = {}
type ReducerState = typeof initialState
export const appReducer = (state: ReducerState = initialState, action: AppReducerActions): ReducerState => {
    switch (action.type) {
        default: {
            return state
        }
    }
}
