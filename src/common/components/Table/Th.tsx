import React, {memo, ReactNode} from 'react';
import styled from "styled-components";
import {Eject} from "@styled-icons/material";
type PT = {
    children: ReactNode
}

export const Th = memo(
    ({
         children
     }: PT) => {
        return (
            <StyledTh>
                {children}
                <Eject/>
            </StyledTh>
        );
    }
);
const StyledTh = styled.th`
  text-align: start;
  cursor: pointer;

  svg {
    opacity: 0;
    width: 2vh;
  }

  &:hover {
    svg {
      opacity: 0.5;
    }
  }

`