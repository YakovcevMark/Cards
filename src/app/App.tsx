import React, {useEffect} from 'react';
import {Navigate, NavLink, useNavigate} from "react-router-dom";

import {AppRoutes, LoginPath, ProfilePath} from "../common/components/Routes/AppRoutes";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {setAppStatus} from "./appSlice";
import HelperText from "../common/components/HelperText/HelperText";
import styled from "styled-components";
import {backgroundColor} from "../assets/stylesheets/colors";
import {useInitializeMutation} from "../dal/api/apiSlice";
import Profile from "../features/profile/Profile";

function App() {
    const status = useAppSelector(state => state.app.status)
    const navigate = useNavigate()
    // const error = useAppSelector(state => state.app.error)
    // const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    // useEffect(() => {
    //     dispatch(authorization())
    // }, [dispatch])
    // if (!isInitialized) {
    //     return <div>Preloader</div>
    // }

    const [getInitialized, {isLoading, isSuccess}] = useInitializeMutation()
    useEffect(() => {
        getInitialized({});
    }, [getInitialized])
    // let content = isSuccess
    //         ? <Navigate to={`/${ProfilePath}`}/>
    //         : <Navigate to={`/${LoginPath}`}/>

    if (isLoading) {
        return <div>Preloader</div>
    }

    return (
        <Container>
            <header>
                kek <NavLink to={'/login'}>Login</NavLink>&nbsp;
                <NavLink to={'/register'}>register</NavLink>&nbsp;
                <NavLink to={'/passwordRecovery'}>passwordRecovery</NavLink>&nbsp;
                <NavLink to={'/passwordNew'}>passwordNew</NavLink>&nbsp;
                <NavLink to={'/profile'}>profile</NavLink>
            </header>
            <Content>
                <AppRoutes/>
                {/*{content}*/}
                <HelperText>APP STATUS: {status}</HelperText>
                <HelperText>APP STATUS: {status}</HelperText>
                {/*{isError && <HelperText>APP ERROR:<span>{error!.data?.error}</span></HelperText>}*/}
            </Content>
        </Container>
    );
}

const Container = styled.div`
  width: 90%;
  height: 100vh;
  display: grid;
  grid-template: 1fr 10fr/100%;
  margin: 0 auto;

  header {
    background-color: burlywood;
  }

  background: ${backgroundColor};
`
const Content = styled.section`
  align-self: center;
  justify-self: center;
`
export default App;
