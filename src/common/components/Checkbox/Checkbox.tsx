import React, {DetailedHTMLProps, InputHTMLAttributes, memo} from 'react'
import styled from "styled-components";
import {UseFormRegister} from "react-hook-form";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    register:UseFormRegister<any>
    fieldName:string
    onChangeChecked?: (checked: boolean) => void
    error?: string
}

const SuperCheckbox: React.FC<SuperCheckboxPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeChecked,
        register,
        fieldName,
        children, // в эту переменную попадёт текст
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    return (
        <Checkbox>
            <label>
                <input
                    type={'checkbox'}
                    {...restProps}
                    {...register(fieldName)}
                />
                {children && <span>{children}</span>}
            </label>
        </Checkbox>
    )
}
const Checkbox = styled.div`

  display: grid;
  justify-self: start;
  transition: 0.5s;
  :hover {
    cursor: pointer;
  }
  

  label {
    display: grid;
    grid-template-columns:1fr auto;
    align-items: center;

    span {
      font-family: 'Montserrat', sans-serif;
      font-weight: 500;
    }

    input {
      transition: 0.5s;
      width: 18px;
      height: 18px;
    }
  }
`
export default memo(SuperCheckbox)