import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import {Login} from "features/authPages/login/Login";
import {Register} from "features/authPages/register/Register";
import {PasswordRecovery} from "features/authPages/passwordRecovery/PasswordRecovery";
import {PasswordNew} from "features/authPages/passwordNew/PasswordNew";
import {Profile} from "features/Profile/Profile";
import React, {memo} from "react";
import {useInitializeMutation} from "features/authPages/authApi";
import {PacksList} from "features/Packs/PacksList/PacksList";
import {Pack} from "features/Packs/Pack/Pack";
import {LearnPack} from "features/Packs/LearnPack/LearnPack";

export const PATH = {
    login: "/login",
    register: "/register",
    passwordRecovery: "/passwordRecovery",
    passwordNew: "/passwordNew",
    profile: "/Profile",
    packs: "/packs",
    pack: "/pack",
    learn: "/learn"
}

export const AppRoutes = memo(() => {

        const [, {
            isUninitialized,
            isSuccess: isLoggedIn,
            isError: haveErrorWithLoggedIn
        }] = useInitializeMutation({
            fixedCacheKey: 'shared-postMe-post',
        })

        return (
            <Routes>
                <Route element={
                    <PrivateRoutes
                        condition={haveErrorWithLoggedIn || isUninitialized}
                        redirectPath={PATH.packs}/>
                }>
                    <Route path={PATH.login} element={<Login/>}/>
                    <Route path={PATH.register} element={<Register/>}/>
                    <Route path={PATH.passwordRecovery} element={<PasswordRecovery/>}/>
                    <Route path={`${PATH.passwordNew}/:token`} element={<PasswordNew/>}/>
                </Route>

                <Route element={
                    <PrivateRoutes
                        condition={isLoggedIn || isUninitialized}
                        redirectPath={PATH.login}/>
                }>
                    <Route path={PATH.profile} element={<Profile/>}/>
                    <Route path={""} element={<PacksList/>}/>
                    <Route path={PATH.packs} element={<PacksList/>}/>
                    <Route path={`${PATH.pack}/:cardsPack_id`} element={<Pack/>}/>
                    <Route path={`${PATH.learn}/:cardsPack_id`} element={<LearnPack/>}/>
                </Route>
            </Routes>
        );
    }
);
const PrivateRoutes =
    ({condition, redirectPath}: { condition: boolean, redirectPath: string }) =>
        condition ? <Outlet/> : <Navigate to={redirectPath}/>


