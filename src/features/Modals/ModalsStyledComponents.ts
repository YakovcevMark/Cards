import styled from "styled-components";
import {SInputsSection, SPagesContainer} from "common/components/CommonStyledComponents";
import {secondColor} from "assets/stylesheets/colors";

export const SModal = styled.div`
    display: grid;
`
export const SModalContent = styled(SPagesContainer)`
    display: grid;
    height: auto;
    min-height: 30vh;
    box-shadow: 0 0 1vh ${secondColor};
    background: white;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    z-index: 21;
`
export const SModalRelativeBlock = styled.div`
    z-index: 20;
    width: 100vw;
    height: 100vh;
    position: relative;
`
export const SModalBackground = styled.div`
    width: 100vw;
    height: 100vh;
    background: black;
    opacity: 0.35;
    z-index: 20;
    position: fixed;
    top: 0;
    left: 0;
`
export const SModalControlSection = styled.div`
    display: grid;
    justify-content: space-between;
    align-self: end;
    grid-template-columns:repeat(2, 150px);
    padding: 2vh 0;
    button{
       width:100%
    }
`
export const SModalInputsSection = styled(SInputsSection)`
    justify-items: unset;
`