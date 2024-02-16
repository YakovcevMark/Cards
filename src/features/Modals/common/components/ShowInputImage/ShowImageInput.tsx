import styled from "styled-components";
import {SCover} from "features/Packs/PacksStyledComponents";
import {ImageInput, ImageInputPT} from "common/components/Inputs/ImageInput/ImageInput";
import React from "react";
import {Button} from "common/components/Button/Button";

export type ShowImageInputPT = ImageInputPT & {
    image: string
    clearImageHandler: () => void
}
export const ShowImageInput =
    ({
         buttonBody,
         className,
         image,
         children,
         clearImageHandler,
         ...rest
     }: ShowImageInputPT) =>
        <SCoverBlock className={className}>
            {image && <SSCover src={image} alt="img"/>}
            <SButtonBlock>
                {image && <SButton
                    gray
                    onClick={clearImageHandler}>
                    Clear
                </SButton>}
                <ImageInput
                    buttonBody={`${image ? 'Change' : 'Set'} ${buttonBody}`}
                    {...rest}>
                    {children}
                </ImageInput>
            </SButtonBlock>
        </SCoverBlock>
const SButtonBlock = styled.section`
    display: grid;
    grid-template-columns: auto 1fr;
    justify-self: end;
`
const SButton = styled(Button)`
    margin-right: 20px;
`
const SCoverBlock = styled.section`
    display: grid;
    padding-bottom: 1vh;
`
const SSCover = styled(SCover)`
    height: auto;
    max-height: 300px;
    justify-self: center;
    margin-bottom: 1vh;
`

