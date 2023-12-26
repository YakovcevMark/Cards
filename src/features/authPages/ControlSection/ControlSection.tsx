import React, {memo, ReactNode} from 'react';
import styled from "styled-components";

const ControlSection: React.FC<{ children: ReactNode }> = ({children}) => {
    return (
        <Section>
            {children}
        </Section>
    );
};
const Section = styled.section`
  width: 100%;
  display: grid;
  justify-items: center;
  align-self: end;
`
export default memo(ControlSection);