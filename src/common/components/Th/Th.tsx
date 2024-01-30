import React, {ReactNode, useEffect, useState} from 'react';
import styled from "styled-components";
import {Eject} from "@styled-icons/material";

export type ThPT = {
    filterValue: string
    searchValue: string
    children?: ReactNode
    onChange: (value: string) => void
}

export const Th =
    ({
         filterValue,
         searchValue,
         children,
         onChange
     }: ThPT) => {

        const [mode, setMode] = useState<"firstMode" | "secondMode" | "default">("default")
        const changeModeHandler = () => {
            setMode(mode =>
                mode === "firstMode"
                    ? "secondMode"
                    : "firstMode"
            )
        }

        searchValue = searchValue.slice(1)

        useEffect(() => {
            setMode(filterValue === searchValue ? "firstMode" : "default")
        }, [filterValue, searchValue]);

        useEffect(() => {
            if (mode !== "default") {
                const modeSearchValue = mode === "firstMode" ? "0" : "1";
                onChange(`${modeSearchValue}${filterValue}`)
            }
        }, [mode, onChange, filterValue]);

        return (
            <StyledTh>
                <span
                    className={mode}
                    onClick={changeModeHandler}>
                    {children}
                    <Eject/>
                </span>
            </StyledTh>
        )
    }

const StyledTh = styled.th`
    text-align: start;

    span {
        cursor: pointer;
    }

    svg {
        width: 2vh;
        opacity: 1;
    }
    
    .secondMode {
        svg {
            rotate: 180deg;
        }
    }
    .default {
        svg {
            opacity: 0;
        }

        &:hover {
            svg {
                opacity: 0.5;
            }
        }
    }
`
