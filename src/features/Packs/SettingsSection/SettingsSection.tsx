import React, {ReactNode} from 'react';
import styled from "styled-components";

type PT = {
    children: ReactNode
}
export const SettingsSection =
    ({
         children
     }: PT) => {
        return (
            <StyledSettingsSection>
                {children}
            </StyledSettingsSection>
        );
    };
const StyledSettingsSection = styled.section`
  display: grid;
  grid-template-columns: 7fr 3fr 4fr 1fr;
  grid-gap: 2vh;
`