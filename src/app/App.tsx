import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import {AppRoutes, LoginPath} from "../common/components/Routes/AppRoutes";
import styled from "styled-components";
import {backgroundColor, secondColor} from "../assets/stylesheets/colors";
import {useInitializeMutation} from "../dal/api/apiSlice";
import {ReactComponent as RobotSVG} from '../assets/img/robot.svg'
import Button from "../common/components/Button/Button";
import Preloader from "../common/components/Preloader/Preloader";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import {setAppError} from "./appSlice";


function App() {
    const nav = useNavigate()
    const [getInitialized, {data, isSuccess, isLoading}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })
    // const validator = useApiErrorsHandler(getInitialized)
    useEffect( () => {
        getInitialized()
    }, [getInitialized])
    const singInButtonHandler = () => nav(`/${LoginPath}`)

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <Container>
            <Header>
                <RobotSVG/>
                <span>
                     {isSuccess
                         ? <Avatar>
                             <b>{data!.name}</b>
                             <img src={data!.avatar} alt="avatarka"/>
                         </Avatar>
                         : <Button onClick={singInButtonHandler}>Sing In</Button>
                     }
                </span>
            </Header>
            <Content>
                <AppRoutes/>
                <Message/>
            </Content>
        </Container>
    );
}

const Message = () => {
    const error = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (error) {
            const id = setTimeout(() => {
                dispatch(setAppError(null))
            }, 3000)
            return () => {
                clearTimeout(id)
            }
        }
    }, [error, dispatch])
    return error ? <StyledMessage>
            {/*<i className="fa fa-exclamation-triangle" aria-hidden="true"></i>*/}
            {error}
        </StyledMessage>
        : <></>
}
const StyledMessage = styled.div`
  position: absolute;
  justify-self: end;
  align-self: end;
  color: #ffffff;
  background-color: #FF8080;
  font-family: 'Source Sans Pro', sans-serif;
  border-radius: .5em;
  border: 1px solid;
  margin: 10px 0;
  padding: 12px;
  width: 400px;

`

const Avatar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  align-items: center;

  img {
    border-radius: 50%;
    width: 5vh;
    height: 5vh;
    object-fit: cover;
  }
`
const Header = styled.header`
  //background-color: burlywood;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  svg {
    width: 10vh;
    height: auto;

    g {
      fill: ${secondColor};
    }
  }

  span {
    margin-right: 10px;
    justify-self: end;
    display: grid;
  }
`
const Container = styled.div`
  width: 90%;
  height: 100vh;
  display: grid;
  grid-template: 1fr 10fr/100%;
  margin: 0 auto;

    //background: ${backgroundColor};
`
const Content = styled.section`
  display: grid;
  //form {
  //  align-self: center;
  //  justify-self: center;
  //}
  //  align-self: center;
  //  justify-self: center;
`
export default App;
