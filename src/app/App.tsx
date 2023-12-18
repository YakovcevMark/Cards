import React from 'react';
import s from './App.module.scss';
import {NavLink} from "react-router-dom";

import {AppRoutes} from "../components/common/Routes/AppRoutes";
import {useAppDispatch, useAppSelector} from "./hooks";
import {setAppStatus} from "./appReducer";

function App() {
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    return (
        <div className={s.app}>
            <NavLink to={'/login'}>Login</NavLink>&nbsp;
            <NavLink to={'/register'}>register</NavLink>&nbsp;
            <NavLink to={'/passwordRecovery'}>passwordRecovery</NavLink>&nbsp;
            <NavLink to={'/passwordNew'}>passwordNew</NavLink>&nbsp;
            <NavLink to={'/profile'}>profile</NavLink>
            <AppRoutes/>
            <h1>APP STATUS: {status}</h1>
            <button onClick={() => {dispatch(setAppStatus("loading"))}}>FETCH</button>
            <button onClick={() => {dispatch(setAppStatus("succeeded"))}}>SUCCESS</button>
        </div>
    );
}

export default App;
