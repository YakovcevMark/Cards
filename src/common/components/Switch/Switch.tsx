import React from "react";
import styled from "styled-components";
import {secondColor} from "assets/stylesheets/colors";

type PT = {
    optionsNames: string[]
    optionsValues: string[]
    changeHandler: (value: string) => void
    condition: string
    className?: string
}
export const Switch =
    ({
         optionsValues,
         optionsNames,
         className,
         changeHandler,
         condition,
     }: PT) =>
        <SButtonSection
            $length={optionsValues.length}
            className={className}>
            {
                optionsValues.map((o, i) =>
                    <button
                        key={o}
                        type={"button"}
                        className={condition === o ? "active" : ""}
                        onClick={() => changeHandler(o)}
                        value={o}>
                        {optionsNames[i]}
                    </button>
                )
            }
        </SButtonSection>


const SButtonSection = styled.section<{ $length: number }>`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(${props => props.$length}, 1fr);
    button {
        font-size: 20px;
        width:100%;
        &:hover:enabled{
            cursor: pointer;
        }
    }
    .active {
        color: white;
        background-color: ${secondColor};
    }
`