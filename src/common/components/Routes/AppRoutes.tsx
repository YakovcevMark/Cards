import {Route, Routes} from "react-router-dom";
import Login from "../../../features/authPages/login/Login";
import Register from "../../../features/authPages/register/Register";
import PasswordRecovery from "../../../features/authPages/passwordRecovery/PasswordRecovery";
import PasswordNew from "../../../features/authPages/passwordNew/PasswordNew";
import Profile from "../../../features/profile/Profile";
import React from "react";
import {memo} from "react";
export const LoginPath = "login";
export const RegisterPath = "register";
export const PasswordRecoveryPath = "passwordRecovery";
export const PasswordNewPath = "passwordNew";
export const ProfilePath = "profile";
export const AppRoutes = memo(() => {
    return (
        <Routes>
            <Route path={''} element={<Profile/>}/>
            <Route path={"/"}>
                <Route path={LoginPath} element={<Login/>}/>
                <Route path={RegisterPath} element={<Register/>}/>
                <Route path={PasswordRecoveryPath} element={<PasswordRecovery/>}/>
                <Route path={PasswordNewPath} element={<PasswordNew/>}/>
                <Route path={ProfilePath} element={<Profile/>}/>
            </Route>
        </Routes>
    );
});

