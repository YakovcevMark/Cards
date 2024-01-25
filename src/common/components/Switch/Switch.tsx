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
                optionsNames.map((o, i) =>
                    <button
                        className={condition === optionsValues[i] ? "active" : ""}
                        onClick={() => changeHandler(optionsValues[i])}
                        value={optionsValues[i]}>
                        {o}
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
    }

    .active {
        color: white;
        background-color: ${secondColor};
    }
`