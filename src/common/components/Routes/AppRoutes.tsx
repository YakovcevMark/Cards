import {createHashRouter, Navigate, Outlet} from "react-router-dom";
import {Login} from "features/authPages/login/Login";
import {Register} from "features/authPages/register/Register";
import {PasswordRecovery} from "features/authPages/passwordRecovery/PasswordRecovery";
import {PasswordNew} from "features/authPages/passwordNew/PasswordNew";
import {Profile} from "features/Profile/Profile";
import React, {ReactNode} from "react";
import {Packs} from "features/Packs/Packs/Packs";
import {Cards} from "features/Packs/Cards/Cards";
import {LearnPack} from "features/Packs/LearnPack/LearnPack";
import {App} from "app/App";
import {PageNotFound} from "common/components/PageNotFoung/PageNotFound";
import {useAppSelector} from "common/hooks/hooks";
import {selectAppData} from "app/appSlice";
import {Preloader} from "common/components/Preloader/Preloader";

const InitApp = ({children}: { children: ReactNode }) => {
    const {
        isAppInitialized,
    } = useAppSelector(selectAppData)

    return isAppInitialized
        ? <>
            {children}
        </>
        : <Preloader/>
}

const AuthRedirect = () => {
    const {
        isSuccess: isAppInitializedSuccessfully,
    } = useAppSelector(selectAppData)

    return <InitApp>
        {isAppInitializedSuccessfully
            ? <Outlet/>
            : <Navigate to={PATH.login}/>
        }
    </InitApp>
}
const CardsRedirect = () => {
    const {
        isError: isAppInitializedWithError
    } = useAppSelector(selectAppData)

    return <InitApp>
        {isAppInitializedWithError
            ? <Outlet/>
            : <Navigate to={PATH.packs}/>
        }
    </InitApp>
}
export const PATH = {
    auth: "/auth",
    login: "/auth/login",
    register: "/auth/register",
    passwordRecovery: "/auth/passwordRecovery",
    passwordNew: "/auth/passwordNew",
    packs: "/",
    profile: "/profile",
    cards: "/cards",
    learn: "/learn"
} as const

export const router = createHashRouter([{
    path: "/",
    element: <App/>,
    errorElement: <PageNotFound/>,
    children: [{
        path: "/",
        element: <AuthRedirect/>,
        children: [{
            path: PATH.profile,
            element: <Profile/>
        }, {
            path: PATH.packs,
            element: <Packs/>
        }, {
            path: `${PATH.cards}/:cardsPack_id`,
            element: <Cards/>
        }, {
            path: `${PATH.learn}/:cardsPack_id`,
            element: <LearnPack/>
        }]
    }, {
        path: PATH.auth,
        element: <CardsRedirect/>,
        children: [{
            path: PATH.login,
            element: <Login/>
        }, {
            path: PATH.register,
            element: <Register/>
        }, {
            path: `${PATH.passwordNew}/:token`,
            element: <PasswordNew/>
        }, {
            path: PATH.passwordRecovery,
            element: <PasswordRecovery/>
        }]
    }]
}])
