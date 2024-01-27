import styled from "styled-components";
import {antoColor, secondColor} from "assets/stylesheets/colors";

export const SErrorMessage = styled.span`
    color: #FF0000FF
`
const gray = '#9b9b9b';
const red = '#f34141'
const opacityRed = 'rgba(243,65,65,0.36)'


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

        &:hover {
            border-color: ${({error}) => error ? opacityRed : "black"};

            &:disabled {
                border-color: ${({error}) => error ? red : gray};
            }
        }

        &:placeholder-shown ~ label {
            font-size: 0;
            top: 40px;
            left: 45px;
        }

        &:focus {
            ~ label {
                font-size: 1rem;
                top: 0;
                left: 0;
                color: ${secondColor};
            }

            &::placeholder {
                color: transparent;
            }

            padding-bottom: 6px;
            font-weight: 600;
            border-width: 3px;
            border-color: ${secondColor};
        }
    }

    label {
        font-size: 1rem;
        top: 0;
        left: 0;
        position: absolute;
        transition: 0.2s;
        color: ${({error}) => error ? red : gray};
        font-weight: 700;
    }
`