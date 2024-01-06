import React, {useEffect} from 'react';
import {NavLink, useNavigate} from "react-router-dom";

import {
    AppRoutes, CardsPath,
    LoginPath,
    PasswordRecoveryPath,
    ProfilePath,
    RegisterPath
} from "../common/components/Routes/AppRoutes";
import styled from "styled-components";
import {backgroundColor, secondColor} from "../assets/stylesheets/colors";
import {useInitializeMutation} from "../dal/api/apiSlice";
import {ReactComponent as RobotSVG} from '../assets/img/robot.svg'
import Button from "../common/components/Button/Button";
import Preloader from "../common/components/Preloader/Preloader";
import {Message} from "../common/components/Alert/Message";
import {useApiErrorsHandler} from "../common/hooks/hooks";
import Cards from "../features/cards/Cards";


function App() {
    const nav = useNavigate()
    const [getInitialized, {data, isSuccess, isLoading}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })
    const validator = useApiErrorsHandler(getInitialized)
    // useEffect(() => {
    //     getInitialized()
    // }, [getInitialized])
    const singInButtonHandler = () => nav(LoginPath)

    return isLoading ? <Preloader/> : (
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
                <Cards/>
                {/*<AppRoutes/>*/}
                {/*<Message/>*/}
            </Content>
            {/*<NavLink to={LoginPath}>login</NavLink>*/}
            {/*<NavLink to={RegisterPath}>Register</NavLink>*/}
            {/*<NavLink to={PasswordRecoveryPath}>PasRec</NavLink>*/}
            {/*<NavLink to={ProfilePath}>Profile</NavLink>*/}
            {/*<NavLink to={CardsPath}>Cards</NavLink>*/}
        </Container>
    );
}

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
