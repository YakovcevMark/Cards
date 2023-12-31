import React, {useEffect} from 'react';
import {NavLink} from "react-router-dom";

import {
    AppRoutes,
    PacksPath,
    LoginPath,
    PasswordRecoveryPath,
    ProfilePath,
    RegisterPath
} from "../common/components/Routes/AppRoutes";
import styled from "styled-components";
import {useInitializeMutation} from "../dal/api/apiSlice";
import Preloader from "../common/components/Preloader/Preloader";
import {Message} from "../common/components/Alert/Message";
import {useApiErrorsHandler} from "../common/hooks/hooks";
import {Header} from "./Header/Header";
import {PackList} from "../features/cards/PackList";


function App() {
    const [getInitialized, {data, isSuccess, isLoading}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })
    // const onGetInitialized = useApiErrorsHandler(getInitialized)
    // useEffect(() => {
    //     onGetInitialized()
    // }, [onGetInitialized])

    return isLoading ? <Preloader/> : (
        <Container>
            <Header
                showMode={isSuccess}
                name={data?.name}
                avatar={data?.avatar}/>
            <Content>
                <PackList/>
                {/*<AppRoutes/>*/}
                {/*<Message/>*/}
                <NavLink to={LoginPath}>login</NavLink>
                <NavLink to={RegisterPath}>Register</NavLink>
                <NavLink to={PasswordRecoveryPath}>PasRec</NavLink>
                <NavLink to={ProfilePath}>Profile</NavLink>
                <NavLink to={PacksPath}>Cards</NavLink>
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
`
const Content = styled.section`
  display: grid;
`

export default App;
