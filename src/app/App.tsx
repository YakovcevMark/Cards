import React from 'react';
import {useNavigate} from "react-router-dom";

import {AppRoutes, LoginPath} from "../common/components/Routes/AppRoutes";
import {useAppDispatch, useAppSelector} from "../common/hooks/hooks";
import styled from "styled-components";
import {backgroundColor, secondColor} from "../assets/stylesheets/colors";
import {useInitializeMutation} from "../dal/api/apiSlice";
import {ReactComponent as RobotSVG} from '../assets/img/robot.svg'
import Button from "../common/components/Button/Button";
import Preloader from "../common/components/Preloader/Preloader";
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
    // useEffect(() => {
    //     getInitialized({});
    // }, [getInitialized])
    // let content = isSuccess
    //         ? <Navigate to={`/${ProfilePath}`}/>
    //         : <Navigate to={`/${LoginPath}`}/>

    const singInButtonHandler = () => navigate(`/${LoginPath}`)

    if (isLoading) {
        return <Preloader/>
    }

    return (
        <Container>
            <Header>
                <RobotSVG/>
                <Button onClick={singInButtonHandler}>Sing In</Button>
                {/*<Button onClick={() => {*/}
                {/*    navigate(`/${ProfilePath}`)*/}
                {/*}}>profile</Button>*/}
            </Header>
            <Content>
                <Profile
                    email={"yakovcevmark.dev@gmail.com"}
                    name={"Markusha"}
                    _id={"343434"}
                    publicCardPacksCount={3}
                    avatar={"https://s0.rbk.ru/v6_top_pics/media/img/4/56/346924588693564.jpeg"}/>
                <AppRoutes/>
                {/*<HelperText>APP STATUS: {status}</HelperText>*/}
            </Content>
        </Container>
    );
}

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

  button {
    margin-right: 10px;
    justify-self: end;
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
