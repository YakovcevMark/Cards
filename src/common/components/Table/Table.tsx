import React, {memo, ReactNode} from 'react';
import styled from "styled-components";


type PT = {
    children: ReactNode
}
export const Table = memo(
    ({
         children
     }: PT) => {
        return (
            <StyledTable>
                {children}
            </StyledTable>
        );
    }
);
const StyledTable = styled.table`
  width: 100%;
`
