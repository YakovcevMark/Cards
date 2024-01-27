import React, {ReactNode, useState} from 'react';
import styled from "styled-components";

type PT = {
    className?: string
    moduleChildrenBody: ReactNode
    children: ReactNode
}

export const HoverModule =
    ({
         className,
         moduleChildrenBody,
         children
     }: PT) => {
        const [seeMode, setSeeMode] = useState(false)
        return (
            <SHoverModule
                className={className}
                onMouseEnter={() => setSeeMode(true)}
                onMouseLeave={() => setSeeMode(false)}>
                {seeMode && <section>
                    {moduleChildrenBody}
                </section>}
                {children}
            </SHoverModule>
        );
    };

export const SButtonWithIcon = styled.button`
    width: 100%;
    display: grid;
    grid-template-columns: 1vh 1fr;
    grid-gap: 15px;
    align-items: center;
    padding: 1vh;
    border: none;
    //background-color: burlywood;
    background-color: white;

    svg {
        width: 2vh;
        padding-right: 1vh;

        &:enabled {
            fill: black;
        }
    }

    span {
        justify-self: start;
        padding-left: 1vh;
    }

    &:enabled:hover {
        background-color: #d2d2d2;
        cursor: pointer;
    }


`
const SModule = styled.section`
    border: 1px rgba(0, 0, 0, 0.47) solid;
    position: absolute;
    top: 7vh;
    right: 3vh;
    z-index: 99;
`
export const SHoverModule = styled.div`
    //background-color: blueviolet;
    display: none;
    border: 1px rgba(0, 0, 0, 0.47) solid;
    position: absolute;
    top: 7vh;
    right: 3vh;
    z-index: 99;
    width: 100%;
`
