import styled from "styled-components";
import React, {ReactNode} from "react";
type PT = {
    children: ReactNode
}
export const Setting =
    ({
         children
     }: PT) => {
        return (
            <StyledSetting>
                {children}
            </StyledSetting>
        );
    };
const StyledSetting = styled.article`
  display: grid;
  grid-template-rows: 1fr 3fr;
  height: 10vh;

  button {
    border: 1px solid rgba(0, 0, 0, 0.2)
  }

  label {
    position: relative;
  }

  h1 {
    font-size: 20px;
  }

  svg {
    width: 3vh;
  }
`