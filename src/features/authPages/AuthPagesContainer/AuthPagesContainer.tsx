import React, {memo, ReactNode} from 'react';
import styled from "styled-components";
const AuthPagesContainer: React.FC<{ children:ReactNode }> =
    ({children}) => {
        return  (
            <SForm>
                <Container>
                    {children}
                </Container>
            </SForm>
        );
    };
const SForm = styled.div`
  padding-top: 20px;
  border-radius: 10px;
  width: 413px;
  height:600px;
  background: white;
`
const Container = styled.div`
  width: 90%;
  height: 90%;
  margin: 0 auto;
  display: grid;
  justify-items: center;
`

export default memo(AuthPagesContainer);