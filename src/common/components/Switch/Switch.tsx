import React from "react";
import styled from "styled-components";
import {secondColor} from "assets/stylesheets/colors";

type PT = {
    optionsNames: string[]
    optionsValues: string[]
    changeHandler: (value: string) => void
    condition: string
    className?: string
    disabled?: boolean
}
export const Switch =
    ({
         optionsValues,
         optionsNames,
         className,
         changeHandler,
         condition,
        disabled
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
                        value={o}
                        disabled={disabled}>
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
        border: 1px solid rgba(0, 0, 0, 0.2);
        font-size: 20px;
        width: 100%;

        &:hover {
            &:enabled {
                cursor: pointer;
                border: 1px solid rgba(0, 0, 0, 0.5);
            }
            
            &:disabled {
                border: 1px solid rgba(0, 0, 0, 0.2);
                cursor: auto;
            }
        }

    }

    .active {
        color: white;
        background-color: ${secondColor};
    }
`