import styled, {css} from "styled-components";
import {secondColor} from "assets/stylesheets/colors";
import {Button} from "common/components/Button/Button";
export const IconButtonStyles = css`
    border: none;
    border-radius: 0;
    width: 4vh;
    height: 4vh;
    background: transparent;
    color: black;
    box-shadow: none;

    svg {
        width: 3vh;
        height: 3vh;
    }

    &:disabled {
        color: rgba(0, 0, 0, 0.7);
    }

    &:hover:enabled {
        svg {
            fill: ${secondColor};
        }

        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }
`
export const SIconButton = styled(Button)`
    ${IconButtonStyles}
`
export const SDopInputControl = styled.div`
    position: absolute;
    top: 15px;
    right: 30px;
    display: inline-block;
    width: 24px;
    height: 24px;
    &:hover {
        cursor: pointer;
    }
`

export const SAvatarImg = styled.img`

    border-radius: 50%;
    height: 100%;
    width: 100%;
    object-fit: cover;

`
export const SHelperText = styled.h6`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0;
  text-align: left;
  opacity: 0.8;
`

export const STitle = styled.h1`
  font-size: 26px;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0;
  text-align: left;
`

export const SPagesContainer = styled.div`
  align-self: center;
  justify-self: center;
  padding-top: 20px;
  border-radius: 10px;
  width: 500px;
  height: 65vh;
  background: white;
`
export const SForm = styled.form`
    display: grid;
    width: 90%;
    height: 90%;
    margin: 0 auto;
`
export const SControlSection = styled.section`
  width: 100%;
  display: grid;
  justify-items: center;
  align-self: end;
`
export const  SInputsSection= styled.section`
  width: 100%;
  height: 50%;
  display: grid;
  justify-items: center;
`
export const SButtonControl = styled.div`
  width: 80%;

  button {
    width: 100%;
  }
`