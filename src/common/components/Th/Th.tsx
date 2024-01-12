import React, {memo, ReactNode, useState} from 'react';
import styled from "styled-components";
import {Eject} from "@styled-icons/material";

type PT = {
    value?: string
    children?: ReactNode
}

export const Th = memo(
    ({
         value,
         children
     }: PT) => {
        const [mode, setMode] = useState<"firstMode" | "secondMode" | "default">("default")
        const changeModeHandler = () => {
            setMode(mode =>
                mode === "default"
                    ? "firstMode"
                    : mode === "firstMode"
                        ? "secondMode" : "default"
            )
        }

        if(mode !== "default") console.log(mode)
        return (
            <StyledTh>
                <span
                    className={mode}
                    onClick={changeModeHandler}>
                    {value}
                    <Eject/>
                </span>
                {children}
            </StyledTh>
        )
            ;
    }
);
const StyledTh = styled.th`
  text-align: start;

  span {
    cursor: pointer;
  }

  svg {
    width: 2vh;
    opacity: 1;
  }

  .firstMode {
    svg {
    }
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
