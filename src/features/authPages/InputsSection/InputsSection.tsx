import React, {memo, ReactNode} from 'react';
import styled from "styled-components";

const  InputsSection: React.FC<{ children: ReactNode }> = ({children}) => {
    return (
        <Section>
            {children}
        </Section>
    );
};
const Section = styled.section`
  width: 100%;
  height: 50%;
  display: grid;
  justify-items: center;
`
export default memo(InputsSection);