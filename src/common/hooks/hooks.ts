import {AppDispatch, RootState} from "app/store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
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
 * @param triggerFn - some function, would you like to trigger after delay
 * @param delay - delay of trigger your function
 * @param initValue - initialValue
 */
export const useSearchWithDelay = (triggerFn: any, delay = 1000, initValue = "") => {
    const [value, setValue] = useState(initValue);

    useEffect(() => {
        const timerId = setTimeout(() => {
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
