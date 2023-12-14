import React from 'react';
import './App.css';
import {NavLink} from "react-router-dom";

import {AppRoutes} from "../components/common/Routes/AppRoutes";

function App() {
    return (
        <div className="App">
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
