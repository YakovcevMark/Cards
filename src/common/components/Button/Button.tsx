import React, {ButtonHTMLAttributes, DetailedHTMLProps, memo} from 'react'
import styled from "styled-components";
import {antoColor, buttonShadow, grayColor, mainColor, secondColor} from "assets/stylesheets/colors";


type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export type ButtonPT = DefaultButtonPropsType & {
    red?: boolean
    gray?: boolean
    icon?: boolean
    color?: boolean
}

export const Button: React.FC<ButtonPT> = memo(
    (
        {
            red,
            gray,
            color,
            icon,
            children,
            ...restProps
        }
    ) => {
        const finalColor = color ? color : red ? 'rgba(255, 54, 54, 1)' : gray ? grayColor : secondColor;
        return !icon ? (
            <SButton
                type={"button"}
                color={finalColor}
                {...restProps}>
                {children}
            </SButton>
        ) : (
            <IconButton
                type={"button"}
                color={finalColor}
                {...restProps}>
                {children}
            </IconButton>
        )
    }
)
const IconButton = styled.button<{ color: string }>`
    border: none;
    width: 4vh;
    height: 4vh;
    background-color: transparent;

    svg {
        width: 100%;
        height: 100%;
    }

    &:hover:enabled {
        cursor: pointer;
        svg {
            fill: ${secondColor};
        }
    }
`
const SButton = styled.button<{ color: string }>`
    padding: 0 10px;
    height: 36px;
    border-radius: 30px;
    border: 0;
    background: ${({color}) => secondColor && color};
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.01em;
    text-align: center;
    color: ${({color}) => color === grayColor ? secondColor : mainColor};
    box-shadow: 0 4px 18px 0 ${buttonShadow};
    transition: 0.5s;

  &:hover:enabled {
    -webkit-box-shadow: inset 0 0 0 1px ${antoColor};
    -moz-box-shadow: inset 0 0 0 1px ${antoColor};
    box-shadow: inset 0 0 0 1px ${antoColor};
    cursor: pointer;
  }

  &:disabled {
    opacity: 0.7;
  }
`