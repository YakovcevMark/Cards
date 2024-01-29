import styled, {css} from "styled-components";
import {antoColor, secondColor} from "assets/stylesheets/colors";

export const SErrorMessage = styled.span`
    color: #FF0000FF
`
const gray = '#9b9b9b';
const red = '#f34141'
const opacityRed = 'rgba(243,65,65,0.36)'


const SSameLabelStyle = css`
    font-size: 1rem;
    top: 0;
    left: 0;
    line-height: 10px;
`

export const SInput = styled.div<{ error?: string, disabled?: boolean }>`
    position: relative;
    padding: 15px 0 20px;
    margin-top: 10px;
    width: 100%;

    input {
        font-family: inherit;
        width: 100%;
        border: 0;
        border-bottom: 2px solid ${({error}) => error ? red : gray};
        outline: 0;
        font-size: 1.3rem;
        color: ${antoColor};
        padding: 7px 0;
        background: transparent;
        transition: border-color 0.2s;
        position: relative;
        z-index: 1;
        &:hover {
            border-color: ${({error}) => error ? opacityRed : "black"};
            &:disabled {
                border-color: ${({error}) => error ? red : gray};
            }
        }

        &::placeholder{
            color: transparent;
        }
        &:placeholder-shown  {
            ~ label {
                font-size: 1.3rem;
                line-height: 10px;
                top: 30px;
                left: 0;
            }
        }

        &:focus {
            ~ label {
                ${SSameLabelStyle};
                color: ${secondColor};
            }
            padding-bottom: 6px;
            font-weight: 600;
            border-width: 3px;
            border-color: ${secondColor};
        }
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
            transition: all 5000s ease-in-out 0s;
            ~ label {
                ${SSameLabelStyle};
            }
        }
    }
    label {
        z-index: 0;
        ${SSameLabelStyle};
        position: absolute;
        transition: 0.2s;
        color: ${({error}) => error ? red : gray};
        font-weight: 700;
    }
`
