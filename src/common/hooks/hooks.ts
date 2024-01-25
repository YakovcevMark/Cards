import {AppDispatch, RootState} from "app/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {setAppError} from "app/appSlice";
import {useCallback, useEffect, useState} from "react";
import {useInitializeMutation} from "features/authPages/authApi";
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

    return {searchParams, setSearchParams, useMySetSearchParams};
}
/**
 * useSearchWithDelay - custom hook, witch return same functional as `useState`
 * and trigger the function after `delay`, with value, that it's `useState` gave you.
 * @param initValue - initialValue
 * @param triggerFn - some function, would you like to trigger after delay
 * @param delay - delay of trigger your function
 */
export const useSearchWithDelay = (initValue = "", triggerFn: any, delay = 1000) => {
    const [value, setValue] = useState(initValue);

    useEffect(() => {
        const timerId = setTimeout(() => {
            // console.log(value)
            if (value !== initValue)
                triggerFn(value)
        }, delay)
        return () => clearTimeout(timerId)
    }, [value, initValue, delay, triggerFn])

    return [value, setValue] as const;
}

/**
 * https://keyholesoftware.com/cancel-a-react-modal-with-escape-key-or-external-click/
 */
export const useEscapeKey = (handleClose: any) => {
    const handleEscKey = useCallback((event: any) => {
        if (event.key === 'Escape') {
            handleClose();
        }
    }, [handleClose]);

    useEffect(() => {
        document.addEventListener('keyup', handleEscKey, false);

        return () => {
            document.removeEventListener('keyup', handleEscKey, false);
        };
    }, [handleEscKey]);
}
