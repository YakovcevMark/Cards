import {AppDispatch, RootState} from "../../app/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {setAppError} from "../../app/appSlice";
import {useCallback, useEffect, useState} from "react";
import {useInitializeMutation} from "../../features/authPages/authApi";
import {useSearchParams} from "react-router-dom";

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
export const useAppSearchParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const useMySetSearchParams = (param: string) =>
        useCallback((value: string) => {
            setSearchParams(searchParams => {
                searchParams.set(param, value);
                return searchParams;
            });
        }, [param])

    return { searchParams, setSearchParams, useMySetSearchParams };
}
export const useSearchWithDelay = (searchFn: any, delay: number = 1000) => {
    const [value, setValue] = useState("");

    useEffect(() => {
        const timerId = setTimeout(() => {
            // console.log(value)
            searchFn(value)
        }, delay)

        return () => clearTimeout(timerId)
    }, [value, delay, searchFn])

    return setValue;
}