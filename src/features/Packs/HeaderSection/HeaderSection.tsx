import React, {ReactNode} from 'react';
import styled from "styled-components";

type PT = {
    children: ReactNode
}
export const HeaderSection =
    ({
         children
     }: PT) => {
        return (
            <StyledHeaderSection>
                {children}
            </StyledHeaderSection>
        );
    };
const StyledHeaderSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;

  h1 {
    justify-self: start;
  }

  button {
    justify-self: end;
  }
`