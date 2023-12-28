import React, {ButtonHTMLAttributes, DetailedHTMLProps, memo} from 'react'
import styled from "styled-components";
import {antoColor, buttonShadow, grayColor, mainColor, secondColor} from "../../../assets/stylesheets/colors";


// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    gray?: boolean
    icon?: boolean
    color?:boolean
}

export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red,
        gray,
        color,
        icon,
        children,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalColor = color ? color : red ? 'red' : gray ? grayColor : secondColor;
    return !icon ? (
        <Button
            color={finalColor}
            {...restProps}>
            {children}
        </Button>
    ) : (
        <IconButton
            color={finalColor}
            {...restProps}>
            {children}
        </IconButton>
    )
}

const IconButton = styled.button<{ color: string }>`
  border:none;
  width: 4vh;
  height: 4vh;
  svg {
    width: 100%;
    height: 100%;
  }
`
const Button = styled.button<{ color: string }>`
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

  &:hover {
    -webkit-box-shadow: inset 0 0 0 1px ${antoColor};
    -moz-box-shadow: inset 0 0 0 1px ${antoColor};
    box-shadow: inset 0 0 0 1px ${antoColor};
    cursor: pointer;

    &:disabled {
      box-shadow: none;
    }
  }

  &:disabled {
    opacity: 0.7;
  }
`
export default memo(SuperButton)