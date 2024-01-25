import noImage from "assets/img/noImage.svg";
import styled from "styled-components";
import {SCover} from "features/Packs/PacksStyledComponents";
import {ImageInput} from "common/components/Inputs/ImageInput/ImageInput";
import React from "react";

type PT = {
    buttonBody: string
    className?: string
    cover?: string
    changeCoverHandler: (value: string) => void
}
export const ShowInputImage =
    ({
         buttonBody,
         className,
         cover,
         changeCoverHandler
     }: PT) =>
        <SCoverBlock className={className}>
            <SSCover src={cover ? cover : noImage} alt="img"/>
            <SImageInput
                onChange={changeCoverHandler}>
                {buttonBody}
            </SImageInput>
        </SCoverBlock>

const SCoverBlock = styled.section`
    display: grid;
`
const SSCover = styled(SCover)`
    width: 100%;
    height: auto;
    justify-self: start;
    margin-bottom: 1vh;
`
const SImageInput = styled(ImageInput)`
    justify-self: end;
`
