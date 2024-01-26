import noImage from "assets/img/noImage.svg";
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
            <SSCover src={image ? image : noImage} alt="img"/>
            <SButtonBlock>
                <Button
                    gray
                    onClick={clearImageHandler}
                    disabled={!image}>
                    Clear
                </Button>
                <ImageInput
                    buttonBody={buttonBody}
                    {...rest}>
                    {children}
                </ImageInput>
            </SButtonBlock>
        </SCoverBlock>
const SButtonBlock = styled.section`
    justify-self: end;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 1vw;
`
const SCoverBlock = styled.section`
    display: grid;
    padding-bottom: 1vh;

`
const SSCover = styled(SCover)`
    width: 100%;
    height: auto;
    justify-self: start;
    margin-bottom: 1vh;
`

