import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";

import {AppRoutes, LoginPath} from "../common/components/Routes/AppRoutes";
import styled from "styled-components";
import {backgroundColor, secondColor} from "../assets/stylesheets/colors";
import {useInitializeMutation} from "../dal/api/apiSlice";
import {ReactComponent as RobotSVG} from '../assets/img/robot.svg'
import Button from "../common/components/Button/Button";
import Preloader from "../common/components/Preloader/Preloader";

function App() {
    const nav = useNavigate()
    const [getInitialized, {data, isLoading, isSuccess}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })
    useEffect(() => {
        getInitialized();
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
                         :  <Button onClick={singInButtonHandler}>Sing In</Button>
                     }
                </span>
            </Header>
            <Content>
                <AppRoutes/>
            </Content>
        </Container>
    );
}
const Avatar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap:10px;
  align-items: center;
  img {
    border-radius: 50%;
    width:5vh;
    height:5vh;
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
    display:grid;
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
  align-self: center;
  justify-self: center;
`
export default App;
