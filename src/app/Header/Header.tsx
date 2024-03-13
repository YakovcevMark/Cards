import React, {useCallback, useEffect} from 'react';
import {Button} from "common/components/Button/Button";
import {useNavigate} from "react-router-dom";
import {ReactComponent as RobotSVG} from '../../assets/img/robot.svg'
import styled from "styled-components";
import {secondColor} from "assets/stylesheets/colors";
import {Logout, Person} from "@styled-icons/material";
import {useLogoutMutation} from "features/authPages/authApi";
import {SAvatarImg, SButtonWithIcon, SHoverModule} from "common/components/CommonStyledComponents";
import {PATH} from "common/components/Routes/AppRoutes";
import {useAppSelector} from "common/hooks/hooks";
import {selectAppData} from "app/appSlice";
import {SCutString} from "features/Packs/PacksStyledComponents";

export const Header =
    () => {
        const {
            isSuccess: isLoggedIn,
            userData,
        } = useAppSelector(selectAppData)

        const {
            isAppInitialized,
            isError: isAppInitializedWithError
        } = useAppSelector(selectAppData)

        const [logOut, {
            isLoading: isLogOutLoading,
        }] = useLogoutMutation()

        const nav = useNavigate()

        const singInButtonHandler = useCallback(() => nav(PATH.login), [nav])

        const profileButtonHandler = () => nav(PATH.profile);

        const logOutButtonHandler = async () => await logOut()

        useEffect(() => {
            isAppInitializedWithError && singInButtonHandler()
        }, [isAppInitializedWithError, singInButtonHandler]);

        let controlSectionContent =
            isLoggedIn
                ? <Avatar>
                    <SCutString>
                        <b>
                            {userData?.name}
                        </b>
                    </SCutString>
                    <SSAvatarImg src={userData?.avatar} alt="avatarka"/>
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

        return isAppInitialized ? (
            <StyledHeader>
                <SRobotSVG>
                    <RobotSVG/>
                </SRobotSVG>
                <ControlSection>
                    {controlSectionContent}
                </ControlSection>
            </StyledHeader>
        ) : null
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

