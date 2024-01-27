import React, {ChangeEvent, MouseEvent, ReactNode, useRef} from "react";
import {Button, ButtonPT} from "common/components/Button/Button";

export type ImageInputPT = ButtonPT & {
    children?: ReactNode
    imageHandler: (file: string ) => void
    isIcon?:boolean
    buttonBody:ReactNode | string
    className?:string
}
export const ImageInput =
    ({
         isIcon,
         children,
         imageHandler,
         className,
         buttonBody,
        ...rest
     }: ImageInputPT) => {
        const inputRef = useRef<HTMLInputElement>(null)
        const changeAvatar = (e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            inputRef.current && inputRef.current.click();
        };
        const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
            const fileObj = event.target.files && event.target.files[0];
            const reader = new FileReader();
            if (!fileObj) {
                return;
            }
            reader.readAsDataURL(fileObj);
            reader.onload = () => {
                if (reader.result) {
                    imageHandler(reader.result as string)
                }
            };
            reader.onerror = (error) => {
                console.log('Error: ', error);
            };
        };
        return <>
            <input
                type="file"
                accept={"image/*"}
                style={{display: "none"}}
                ref={inputRef}
                onChange={handleFileChange}
            />
            <Button
                type={"button"}
                icon = {isIcon}
                onClick={changeAvatar}
                className={className}
                {...rest}>
                {buttonBody}
            </Button>
            {children}
        </>
    }