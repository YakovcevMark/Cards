import React, {ChangeEvent, MouseEvent, ReactNode, useRef} from "react";
import {Button} from "common/components/Button/Button";

type PT = {
    children: ReactNode
    onChange: (file: string ) => void
    isIcon?:boolean
    className?:string
}
export const ImageInput =
    ({
         isIcon,
         children,
         onChange,
         className,
     }: PT) => {
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
                    onChange(reader.result as string)
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
                icon = {isIcon}
                onClick={changeAvatar}
                className={className}>
                {children}
            </Button>
        </>
    }