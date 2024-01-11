import React, {DetailedHTMLProps, InputHTMLAttributes, memo, useRef, useState} from 'react'
import styled from "styled-components";
import {antoColor, secondColor} from "../../../assets/stylesheets/colors";
import {Path, UseFormRegister} from "react-hook-form";
import {Visibility, VisibilityOff} from "@styled-icons/material"
import {SHelperText} from "../CommonStyledComponents";


const camelize = (s: string) => {
    return s.toLowerCase()
        .replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
}

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>


type SuperInputTextPropsType = DefaultInputPropsType & {
    label?: Path<any>
    register?: UseFormRegister<any>
    error?: string
    helperText?: string
}

export const Input = memo(
    ({
         label,
         register,
         type,
         children,
         error,
         helperText,
         ...restProps// все остальные пропсы попадут в объект restProps
     }: SuperInputTextPropsType) => {
        const [seeMode, setSeeMode] = useState<boolean>(false)
        const inputRef = useRef<HTMLInputElement>(null)
        const eyeHandle = (e: React.MouseEvent<SVGSVGElement>) => {
            e.preventDefault()
            setSeeMode(!seeMode)
        };

        const finalType = type === "password" && !seeMode ? "password" : 'text';
        const onLabelClickHandler = () => {
            if( inputRef.current )
                inputRef.current.focus()
        }

        return (
            <SInput
                error={error}>
                <input
                    type={finalType}
                    placeholder={label}
                    {...restProps}
                    {...register!(camelize(label!))}
                    ref={inputRef}
                />
                <label
                    onClick={onLabelClickHandler}>
                    {label}
                </label>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {helperText && <SHelperText>{helperText}</SHelperText>}
                {type === "password" &&
                    <Eye
                        href="#"
                        onClick={eyeHandle}>
                        {seeMode
                            ? <VisibilityOff/>
                            : <Visibility/>
                        }
                    </Eye>
                }
                {children &&
                    <DifferentControl>
                        {children}
                    </DifferentControl>
                }
            </SInput>
        )
    }
)
const gray = '#9b9b9b';
const red = '#f34141'
const opacityRed = 'rgba(243,65,65,0.36)'


const ErrorMessage = styled.span`
  color: ${red}
`
const SInput = styled.div<{ error?: string, disabled?: boolean }>`
    // $borderColor = ${({error}) => error ? red : gray};

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


    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ label {
      font-size: 1.3rem;
      cursor: text;
      top: 20px;
    }
  }

  label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    color: ${({error}) => error ? red : gray};
    font-size: 13px;
    line-height: 20px;
  }

  input:focus {
    ~ label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: ${secondColor};
      font-weight: 700;
    }

    padding-bottom: 6px;
    font-weight: 600;
    border-width: 3px;
    border-color:${secondColor};
  }

  /* reset input */

  input {
    &:required, &:invalid {
      box-shadow: none;
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: none
  }

`
const SameStyle = `
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
const DifferentControl = styled.div`
  ${SameStyle}
`

const Eye = styled.svg`
  ${SameStyle};
  top: 19px;
  right: 15px;
`
