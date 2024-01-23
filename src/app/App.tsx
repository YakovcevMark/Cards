import React, {useEffect} from 'react';
import styled from "styled-components";
import {useInitializeMutation} from "features/authPages/authApi";
import {Preloader} from "common/components/Preloader/Preloader";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {Header} from "./Header/Header";
import {AppRoutes} from "common/components/Routes/AppRoutes";
import {Message} from "common/components/Alert/Message";


export function App() {

    const [getInitialized, {
        data, isSuccess, isLoading
    }] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })

    const onGetInitialized = useApiErrorsHandler(getInitialized)
    useEffect(() => {
        onGetInitialized()
    }, [onGetInitialized])

    return isLoading ? <Preloader/> : (
        <Container>
            <Header
                showMode={isSuccess}
                name={data?.name}
                avatar={data?.avatar}/>
            <Content>
                <AppRoutes/>
                <Message/>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    width: 90%;
    height: 100vh;
    display: grid;
    grid-template: 1fr 9fr/100%;
    margin: 0 auto;
`
const Content = styled.section`
    display: grid;
    align-content: start;
`

