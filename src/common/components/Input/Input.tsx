import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import s from './Input.module.scss'
import styled from "styled-components";
import view from '../../../assets/img/view.svg'
import noView from '../../../assets/img/noView.svg'

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
    const finalSpanClassName = `${error ? s.error : ''} ${spanClassName ? spanClassName : ''}`
    // const finalInputClassName = `${error ? s.errorInput : ''} ${className}` // need to fix with (?:) and s.superInput

    const finalType = type === "password" && !seeMode ? "password" : 'text';


    return (
        <div className={s.omrsInputGroup}>
            <label className={s.omrsInputUnderlined}>

                <input
                    type={finalType}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    required={true}
                    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                />
                <span className={s.omrsInputLabel}>{placeholder}</span>
                {helperText && <span className={s.omrsInputHelper}>{helperText}</span>}
                {type === "password" &&
                    <Eye
                        href="#"
                        className={s.passwordControl}
                        onClick={eyeHandle}
                        isOpen={seeMode}>
                    </Eye>
                }
            </label>
        </div>
    )
}
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