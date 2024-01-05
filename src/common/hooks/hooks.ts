import {AppDispatch, RootState} from "../../app/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {setAppError} from "../../app/appSlice";
import {useCallback} from "react";
import {useInitializeMutation} from "../../dal/api/apiSlice";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
// type DispatchFunc = () => AppDispatch
// export const useAppDispatch: DispatchFunc = useDispatch
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


export const useApiErrorsHandler = (method: any, withReFetchMe: boolean = false) => {
    const [getInitializeApp] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })
    const dispatch = useAppDispatch()
    return useCallback(async (rest?: any) => {
        await method(rest)
            .unwrap()
            .then(() => {
                if (withReFetchMe) {
                    getInitializeApp()
                }
            })
            .catch((e: any) => {
                if (e.status === "FETCH_ERROR") {
                    dispatch(setAppError("Connection error, try later /ᐠ-ꞈ-ᐟ\\"))
                    return
                }
                if (e.data.error !== "you are not authorized /ᐠ-ꞈ-ᐟ\\")
                    dispatch(setAppError(e.data.error))
            })

    }, [dispatch, method, getInitializeApp, withReFetchMe])
}