import React, {ReactNode} from "react";
import styled from "styled-components";

type PT = {
    children: ReactNode
}
export const TableSection =
    ({
         children
     }: PT) => {
        return (
            <StyledTableSection>
                {children}
            </StyledTableSection>
        );
    };
const StyledTableSection = styled.section`
  height: auto;
  border: 1px red solid;
`