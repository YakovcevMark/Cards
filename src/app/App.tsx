import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";

import {AppRoutes} from "../common/components/Routes/AppRoutes";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {setAppError, setAppStatus} from "./appSlice";
import {authorization} from "../features/authPages/authSlice";
import HelperText from "../common/components/HelperText/HelperText";
import styled from "styled-components";
import {backgroundColor} from "../assets/stylesheets/colors";
import {useInitializeMutation} from "../dal/api/apiSlice";

function App() {
    const status = useAppSelector(state => state.app.status)
    // const error = useAppSelector(state => state.app.error)
    // const isInitialized = useAppSelector(state => state.app.isInitialized)
    const dispatch = useAppDispatch()
    // useEffect(() => {
    //     dispatch(authorization())
    // }, [dispatch])
    // if (!isInitialized) {
    //     return <div>Preloader</div>
    // }

    const [getInitialized,{isLoading, isError, error}] = useInitializeMutation()
    useEffect(() => {
        getInitialized({});
    },[getInitialized])

    if (isLoading) {
        dispatch(setAppStatus("loading"))
        return <div>Preloader</div>
    }
    if (isError){
        dispatch(setAppStatus('failed'))
        // console.log(error.data.error)
    }

    return (
        <Container>
            <NavLink to={'/login'}>Login</NavLink>&nbsp;
            <NavLink to={'/register'}>register</NavLink>&nbsp;
            <NavLink to={'/passwordRecovery'}>passwordRecovery</NavLink>&nbsp;
            <NavLink to={'/passwordNew'}>passwordNew</NavLink>&nbsp;
            <NavLink to={'/profile'}>profile</NavLink>
            <header>
            kek
            </header>
            <AppRoutes/>

            <HelperText>APP STATUS: {status}</HelperText>
            {/*{isError && <HelperText>APP ERROR:<span>{error!.data?.error}</span></HelperText>}*/}

            <button onClick={() => {
                dispatch(setAppStatus("loading"))
            }}>FETCH
            </button>
            <button onClick={() => {
                dispatch(setAppStatus("succeeded"))
            }}>SUCCESS
            </button>
        </Container>
    );
}
const Container = styled.div`
  background: ${backgroundColor};
  height:100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center ;
`
export default App;
