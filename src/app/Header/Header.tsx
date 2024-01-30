import React, {useCallback, useEffect} from 'react';
import {Button} from "common/components/Button/Button";
import {useNavigate} from "react-router-dom";
import {ReactComponent as RobotSVG} from '../../assets/img/robot.svg'
import styled from "styled-components";
import {secondColor} from "assets/stylesheets/colors";
import {Logout, Person} from "@styled-icons/material";
import {useInitializeMutation, useLogoutMutation} from "features/authPages/authApi";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {SAvatarImg, SButtonWithIcon, SHoverModule} from "common/components/CommonStyledComponents";
import {PATH} from "common/components/Routes/AppRoutes";

export const Header =
    () => {
        const [, {
            isSuccess: showMode,
            data,
        }] = useInitializeMutation({
            fixedCacheKey: 'shared-postMe-post',
        })

        const nav = useNavigate()
        const [logOut, {isLoading: isLogOutLoading, isSuccess}] = useLogoutMutation()
        const onLogout = useApiErrorsHandler(logOut, true)
        const singInButtonHandler = useCallback(() => nav(PATH.login),[nav])
        useEffect(() => {
            isSuccess && singInButtonHandler()
        }, [isSuccess, singInButtonHandler]);
        const profileButtonHandler = () => nav(PATH.profile);
        const logOutButtonHandler = async () => await onLogout()
        let controlSectionContent =
            showMode
                ? <Avatar>
                    <b>{data?.name}</b>
                    <SSAvatarImg src={data?.avatar} alt="avatarka"/>
                    <SSHoverModule>
                        <SButtonWithIcon
                            onClick={profileButtonHandler}>
                            <Person/>
                            <span>Profile</span>
                        </SButtonWithIcon>
                        <SButtonWithIcon
                            onClick={logOutButtonHandler}
                            disabled={isLogOutLoading}>
                            <Logout/>
                            <span>LogOut</span>
                        </SButtonWithIcon>
                    </SSHoverModule>
                </Avatar>
                : <Button onClick={singInButtonHandler}>Sing In</Button>
        return (
            <StyledHeader>
                <SRobotSVG>
                    <RobotSVG/>
                </SRobotSVG>
                <ControlSection>
                    {controlSectionContent}
                </ControlSection>
            </StyledHeader>
        );
    };

const SSAvatarImg = styled(SAvatarImg)`
    width: 5vh;
    height: 5vh;
`

const SSHoverModule = styled(SHoverModule)`
    top: 6vh;
    right: 1vw;
`
const SRobotSVG = styled.div`
    svg {
        width: 10vh;
        height: auto;
        fill: ${secondColor};
    }
`
const StyledHeader = styled.header`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
`

const Avatar = styled.div`
    height: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    grid-gap: 10px;
    align-items: center;
    position: relative;
    justify-items: end;

`
const ControlSection = styled.span`
    height: 100%;
    justify-self: end;
    display: grid;
    align-content: center;

    &:hover {
        div {
            display: grid;
        }
    }
`

