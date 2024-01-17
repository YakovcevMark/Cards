import React from 'react';
import styled, {keyframes} from "styled-components";
import {ReactComponent as RobotSVG} from "../../../assets/img/robot.svg";

export const Preloader = () => {
    return (
        <StyledPreloader>
            <RobotSVG/>
        </StyledPreloader>
    );
};
const preloaderAnimation = keyframes`
  from {
    top: 0;
  }
  to {
    top: 4vh;
  }
`
const StyledPreloader = styled.div `
  height:auto;
  svg {
    width: 20vh;
    margin: auto auto;
    top: 50%;
    bottom:0;
    left: 0;
    right: 0;
    position: absolute;
    animation: ${preloaderAnimation} 1s alternate infinite;
  }
`