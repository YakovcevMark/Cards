import React, {DetailedHTMLProps, InputHTMLAttributes, memo} from 'react'
import styled from "styled-components";
import {UseFormRegister} from "react-hook-form";


type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    register?: UseFormRegister<any>
    registerFieldName?: string
    onChangeChecked?: (checked: boolean) => void
    error?: string
}

export const Checkbox = memo(
    ({
         type,
         onChange, onChangeChecked,
         register,
         registerFieldName,
         children,
         ...restProps
     }: SuperCheckboxPropsType) => {
        return (
            <SCheckbox>
                <label>
                    <input
                        type={'checkbox'}
                        {...restProps}
                        {...register && {...register(registerFieldName || "")} }
                    />
                    {children && <span>{children}</span>}
                </label>
            </SCheckbox>
        )
    }
)
const SCheckbox = styled.div`

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



