import React, {DetailedHTMLProps, InputHTMLAttributes, memo, RefObject} from 'react'
import {UseFormRegister} from "react-hook-form";
import {SHelperText} from "../CommonStyledComponents";
import {SErrorMessage, SInput} from "common/components/Inputs/styles";
import {camelize} from "utils/DataUtils/handleStringsUtils";


type DefaultInputPT = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export type InputPT = Omit<DefaultInputPT, "ref"> & {
    error?: string
    helperText?: string
    register?: UseFormRegister<any>
    registerFieldName?: string;
    ref?: ((instance: HTMLInputElement | null) => void) | RefObject<HTMLInputElement> | null
}
/**
 * Input - App input type text || props.type with custom styles
 * @props register - react-hook-form register
 * @props registerFieldName - react-hook-form registerFieldName
 * registerFieldName || camelize(placeholder)
 */
export const Input = memo(
    ({
         placeholder,
         registerFieldName,
         register,
         type,
         children,
         error,
         helperText,
         className,
         ...restProps
     }: InputPT) => {
        return (
            <SInput
                error={error}
                className={className}>
                <input
                    type={type || "text"}
                    placeholder={placeholder}
                    {...restProps}
                    {...register && {
                        ...register(registerFieldName
                            || (placeholder && camelize(placeholder))
                            || ""
                        )
                    }}
                />
                {placeholder && <label>
                    {placeholder}
                </label>
                }
                {error && <SErrorMessage>{error}</SErrorMessage>}
                {helperText && <SHelperText>{helperText}</SHelperText>}
                {children}
            </SInput>
        )
    }
)
