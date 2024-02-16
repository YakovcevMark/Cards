import React from 'react';
import styled from "styled-components";
import {useInitializeQuery} from "features/authPages/authApi";
import {Preloader} from "common/components/Preloader/Preloader";
import {Message} from "common/components/Alert/Message";
import {Header} from "app/Header/Header";
import {Outlet} from "react-router-dom";


export function App() {

    const {isLoading, isUninitialized} = useInitializeQuery()


    return isLoading || isUninitialized ? <Preloader/> : (
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



