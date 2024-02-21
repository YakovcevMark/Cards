import React, {lazy, ReactNode, Suspense} from "react";
import {App} from "app/App";
import {createHashRouter, Navigate, Outlet} from "react-router-dom";
import {Preloader} from "common/components/Preloader/Preloader";
import {useAppSelector} from "common/hooks/hooks";
import {selectAppData} from "app/appSlice";

const Packs = lazy(() => import( "features/Packs/Packs/Packs"));
const Cards = lazy(() => import( "features/Packs/Cards/Cards"));
const Login = lazy(() => import( "features/authPages/login/Login"));
const Profile = lazy(() => import( "features/Profile/Profile"));
const Register = lazy(() => import( "features/authPages/register/Register"));
const LearnPack = lazy(() => import( "features/Packs/LearnPack/LearnPack"));
const PasswordNew = lazy(() => import( "features/authPages/passwordNew/PasswordNew"));
const PageNotFound = lazy(() => import( "common/components/PageNotFound/PageNotFound"));
const PasswordRecovery = lazy(() => import( "features/authPages/passwordRecovery/PasswordRecovery"));

const InitApp = ({children}: { children: ReactNode }) => {
    const {
        isAppInitialized,
    } = useAppSelector(selectAppData)

    return isAppInitialized
        ? <Suspense fallback={<Preloader/>}>
            {children}
        </Suspense>
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
