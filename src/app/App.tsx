import React from 'react';
import s from './App.module.scss';
import {NavLink} from "react-router-dom";

import {AppRoutes} from "../components/common/Routes/AppRoutes";

function App() {
    return (
        <div className={s.app}>
            <NavLink to={'/login'}>Login</NavLink>&nbsp;
            <NavLink to={'/register'}>register</NavLink>&nbsp;
            <NavLink to={'/passwordRecovery'}>passwordRecovery</NavLink>&nbsp;
            <NavLink to={'/passwordNew'}>passwordNew</NavLink>&nbsp;
            <NavLink to={'/profile'}>profile</NavLink>
            <AppRoutes/>
        </div>
    );
}

export default App;
