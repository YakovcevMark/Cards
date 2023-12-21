import React, {useEffect} from 'react';
import s from './App.module.scss';
import {NavLink} from "react-router-dom";

import {AppRoutes} from "../common/components/Routes/AppRoutes";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {setAppStatus} from "./appSlice";
import {authorization} from "../features/authPages/authSlice";
import HelperText from "../common/components/HelperText/HelperText";

function App() {
    const status = useAppSelector(state => state.app.status)
    const error = useAppSelector(state => state.app.error)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(authorization())
    }, [dispatch])
    if (!isInitialized) {
        return <div>Preloader</div>
    }
    return (
        <div className={s.app}>
            <NavLink to={'/login'}>Login</NavLink>&nbsp;
            <NavLink to={'/register'}>register</NavLink>&nbsp;
            <NavLink to={'/passwordRecovery'}>passwordRecovery</NavLink>&nbsp;
            <NavLink to={'/passwordNew'}>passwordNew</NavLink>&nbsp;
            <NavLink to={'/profile'}>profile</NavLink>
            <AppRoutes/>
            <HelperText>APP STATUS: {status}</HelperText>
            <HelperText>APP ERROR: {error}</HelperText>
            <button onClick={() => {
                dispatch(setAppStatus("loading"))
            }}>FETCH
            </button>
            <button onClick={() => {
                dispatch(setAppStatus("succeeded"))
            }}>SUCCESS
            </button>
        </div>
    );
}

export default App;
