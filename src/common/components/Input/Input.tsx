import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import styled from "styled-components";
import view from '../../../assets/img/view.svg'
import noView from '../../../assets/img/noView.svg'
import {antoColor, backgroundColor, secondColor} from "../../../assets/stylesheets/colors";

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    helperText?: string

}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {

        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        placeholder,
        helperText,
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const [seeMode, setSeeMode] = useState<boolean>(false)

    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }
    const eyeHandle = (e: React.MouseEvent<SVGSVGElement>) => {
        e.preventDefault()
        setSeeMode(!seeMode)
    };


    const finalType = type === "password" && !seeMode ? "password" : 'text';


    return (
        <Input>
            <input
                type={finalType}
                name={placeholder}
                placeholder = {placeholder}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                required={true}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            <label
                htmlFor={placeholder}>
                {placeholder}
            </label>
            {helperText && <span>{helperText}</span>}
            {type === "password" &&
                <Eye
                    href="#"
                    onClick={eyeHandle}
                    isOpen={seeMode}>
                </Eye>
            }

        </Input>
    )
}

const gray= '#9b9b9b';
const Input = styled.div`
  
  position: relative;
  padding: 15px 0 20px;
  margin-top: 10px;
  width: 80%;

  
  input {
    
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid ${gray};
    outline: 0;
    font-size: 1.3rem;
    color: ${antoColor};
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
    &:hover{
      border-color: black;
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
    color: ${gray};
    font-size:13px;
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
    border-image: ${backgroundColor};
    border-image-slice: 1;
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
  input:-webkit-autofill:active  {
    box-shadow: none
  }
  
`

const Eye = styled.svg<{ isOpen: boolean }>`
  position: absolute;
  top: 19px;
  right: -1px;
  display: inline-block;
  width: 24px;
  height: 24px;
  background: url(${({isOpen}) => isOpen ? view : noView}) 0 0 no-repeat;
`
export default SuperInputText