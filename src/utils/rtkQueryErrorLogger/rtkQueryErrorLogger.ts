import type {Middleware, MiddlewareAPI} from '@reduxjs/toolkit'
import {isRejectedWithValue} from '@reduxjs/toolkit'
import {setAppError} from "app/appSlice";

export const rtkQueryErrorLogger: Middleware =
    (api: MiddlewareAPI) => (next) => (action: any) => {
        if (isRejectedWithValue(action)) {
            if (action.payload.status === "FETCH_ERROR") {
                api.dispatch(setAppError("Connection error, try later /ᐠ-ꞈ-ᐟ\\"))
            } else if (action.payload.status !== 401) {
                api.dispatch(setAppError(action.payload.data.error))
            }
        }
        return next(action)
    }