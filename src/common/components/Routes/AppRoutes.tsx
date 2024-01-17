import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {Login} from "../../../features/authPages/login/Login";
import {Register} from "../../../features/authPages/register/Register";
import {PasswordRecovery} from "../../../features/authPages/passwordRecovery/PasswordRecovery";
import {PasswordNew} from "../../../features/authPages/passwordNew/PasswordNew";
import Profile from "../../../features/profile/Profile";
import React, {memo} from "react";
import {useInitializeMutation} from "../../../features/authPages/authApi";
import {PacksList} from "../../../features/Packs/PacksList/PacksList";
import {Pack} from "../../../features/Packs/Pack/Pack";

export const LoginPath = "/login";
export const RegisterPath = "/register";
export const PasswordRecoveryPath = "/passwordRecovery";
export const PasswordNewPath = "/passwordNew";
export const ProfilePath = "/profile";
export const PacksPath = "/packs"
export const PackPath = "/pack"
export const AppRoutes = memo(() => {
        const [, {isSuccess: isLoggedIn}] = useInitializeMutation({
            fixedCacheKey: 'shared-postMe-post',
        })
        return (
            <Routes>
                {/*<Route path={""} element={<Cards/>}/>*/}
                <Route element={
                    <PrivateRoutes
                        condition={!isLoggedIn}
                        path={PacksPath}/>
                }>
                    <Route path={LoginPath} element={<Login/>}/>
                    <Route path={RegisterPath} element={<Register/>}/>
                    <Route path={PasswordRecoveryPath} element={<PasswordRecovery/>}/>
                    <Route path={`${PasswordNewPath}/:token`} element={<PasswordNew/>}/>
                </Route>

                <Route element={
                    <PrivateRoutes
                        condition={isLoggedIn}
                        path={LoginPath}/>
                }>
                    <Route path={ProfilePath} element={<Profile/>}/>

                    <Route path={""} element={<PacksList/>}/>
                    <Route path={PacksPath} element={<PacksList/>}/>
                    <Route path={`${PackPath}/:cardsPack_id`} element={<Pack/>}/>
                </Route>
            </Routes>
        );
    }
);
const PrivateRoutes =
    ({condition, path}: { condition: boolean, path: string }) =>
        condition ? <Outlet/> : <Navigate to={path}/>


