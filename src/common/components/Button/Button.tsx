import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import styled from "styled-components";
import {antoColor, buttonShadow, mainColor, secondColor} from "../../../assets/stylesheets/colors";


// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    primary?: boolean
}

export const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    // const finalClassName = `${s.default} ${red && s.red} ${restProps.disabled && s.disabled} ${className}`

    return (
        <Button
            // className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        />
    )
}
const Button = styled.button`
  width: 266px;
  height: 36px;
  border-radius: 30px;
  border: 0;
  background: ${secondColor};
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.01em;
  text-align: center;
  color: ${mainColor};
  box-shadow: 0 4px 18px 0 ${buttonShadow};

  &:hover {
    border: ${antoColor} solid 1px;
    transition: 0.4s;
  }
`
export default SuperButton