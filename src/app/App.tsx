import React, {useEffect} from 'react';
import styled from "styled-components";
import {useInitializeMutation} from "features/authPages/authApi";
import {Preloader} from "common/components/Preloader/Preloader";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {Message} from "common/components/Alert/Message";
import {Header} from "app/Header/Header";
import {Outlet} from "react-router-dom";


export function App() {

    const [getInitialized, {
        isLoading, isUninitialized
    }] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })

    const onGetInitialized = useApiErrorsHandler(getInitialized)
    useEffect(() => {
        onGetInitialized()
    }, [onGetInitialized])


    return isUninitialized || isLoading ? <Preloader/> : (
        // return (
        <SContainer>
            <Header/>
            <SContent>
                <Outlet/>
                <Message/>
            </SContent>
        </SContainer>
    );
}
const SContent = styled.section`
    display: grid;
    align-content: start;
`
const SContainer = styled.div`
    width: 90%;
    height: 100vh;
    display: grid;
    grid-template: 1fr 9fr/100%;
    margin: 0 auto;
`



