import React from 'react';
import Button from "../../common/components/Button/Button";
import {LoginPath, ProfilePath} from "../../common/components/Routes/AppRoutes";
import {useNavigate} from "react-router-dom";
import {ReactComponent as RobotSVG} from '../../assets/img/robot.svg'
import styled from "styled-components";
import {secondColor} from "../../assets/stylesheets/colors";
import {Logout, Person} from "@styled-icons/material";
import {useLogoutMutation} from "../../dal/api/apiSlice";
import {useApiErrorsHandler} from "../../common/hooks/hooks";

type HeaderT = {
    showMode: boolean
    name?: string
    avatar?: string
}
export const Header =
    ({
         showMode,
         avatar,
         name,
     }: HeaderT) => {

        const nav = useNavigate()
        const [logOut, {isLoading: isLogOutLoading}] = useLogoutMutation()
        const onLogout = useApiErrorsHandler(logOut, true)

        const singInButtonHandler = () => nav(LoginPath)
        const profileButtonHandler = () => nav(ProfilePath);
        const logOutButtonHandler = async () => await onLogout()


        let controlSectionContent =
            showMode
                ? <Avatar>
                    <b>{name}</b>
                    <img src={avatar} alt="avatarka"/>
                    <StyledAvatarModule>
                        <button
                            onClick={profileButtonHandler}>
                            <Person/>
                            <span>Profile</span>
                        </button>
                        <button
                            onClick={logOutButtonHandler}
                            disabled={isLogOutLoading}>
                            <Logout/>
                            <span>LogOut</span>
                        </button>
                    </StyledAvatarModule>
                </Avatar>
                : <Button onClick={singInButtonHandler}>Sing In</Button>
        return (
            <StyledHeader>
                <RobotSVG/>
                <ControlSection>
                    {
                        controlSectionContent
                    }
                </ControlSection>
            </StyledHeader>
        );
    };

const StyledAvatarModule = styled.div`
  //background-color: blueviolet;
  display: none;
  border: 1px rgba(0, 0, 0, 0.47) solid;
  position: absolute;
  top: 7vh;
  right: 3vh;
  
  button {
    width: 100%;
    display: grid;
    grid-template-columns: 1vh 1fr;
    align-items: center;
    padding: 1vh;
    border: none;
    //background-color: burlywood;
    cursor: pointer;

    svg {
      width: 1.5vh;
      fill: black;
    }

    span {
      padding-left: 1vh;
    }
  }
`
const StyledHeader = styled.header`
  //background-color: blue;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  svg {
    width: 10vh;
    height: auto;
    fill: ${secondColor};
  }
`

const Avatar = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  align-items: center;
  position: relative;

  img {
    border-radius: 50%;
    width: 5vh;
    height: 5vh;
    object-fit: cover;
  }
`
const ControlSection = styled.span`
  height: 100%;
  margin-right: 10px;
  justify-self: end;
  display: grid;
  align-content: center;
  
  &:hover {
    div {
      display: grid;
    }
  }
`

