import styled, {css} from "styled-components";
import {secondColor} from "assets/stylesheets/colors";
import {Button} from "common/components/Button/Button";
export const SHoverModule = styled.div`
    display: none;
    box-shadow: 1px 3px 2px rgba(0, 0, 0, 0.45);
    position: absolute;
    top: 7vh;
    right: 3vh;
    z-index: 99;
`
export const ButtonWithIconStyles = css`
    width: 100%;
    display: grid;
    grid-template-columns: 1vh 1fr;
    grid-gap: 15px;
    align-items: center;
    padding: 1vh;
    border: none;
    background-color: white;
    color: black;
    border-radius: 0;

    svg {
        width: 2vh;
        padding-right: 1vh;

        &:enabled {
            fill: black;
        }
    }

    span {
        justify-self: start;
        padding-left: 1vh;
    }

    &:enabled:hover {
        background-color: #d2d2d2;
        cursor: pointer;

    }

    &:disabled {
        opacity: 0.7;

        svg {
            fill: rgba(0, 0, 0, 0.7);
        }
    }

`
export const SButtonWithIcon = styled(Button)`
    ${ButtonWithIconStyles}
`
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
        border: none;
    }

    &:hover {
        &:disabled {
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
            border: none;
            cursor:auto;
        }
    }
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
    box-shadow: 1px 3px 10px 2px rgba(0, 0, 0, 0.6);
    align-self: center;
    justify-self: center;
    padding-top: 20px;
    border-radius: 10px;
    width: 500px;
    height: 65vh;
    background: white;
    @media (max-width: 526px) {
        width: 100%;
    }
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