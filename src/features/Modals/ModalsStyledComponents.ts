import styled from "styled-components";
import {SPagesContainer} from "common/components/CommonStyledComponents";
import {secondColor} from "assets/stylesheets/colors";

export const SModal = styled.div`
    display: grid;
    place-items: center;
`
export const SModalContent = styled(SPagesContainer)`
    display: grid;
    height: auto;
    min-height: 30vh;
    box-shadow: 0 0 1vh ${secondColor};
    background: white;
    position: absolute;
    top:30vh;
    z-index: 21;
    border-radius: 3px;
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
    grid-template-columns:repeat(2, 9vw);
`