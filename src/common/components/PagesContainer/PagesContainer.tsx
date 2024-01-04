import React, {memo, ReactNode} from 'react';
import styled from "styled-components";
const PagesContainer: React.FC<{ children:ReactNode }> =
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
  align-self: center;
  justify-self: center;
  padding-top: 20px;
  border-radius: 10px;
  width: 50vh;
  height: 65vh;
  background: white;
  
`
const Container = styled.div`
  width: 90%;
  height: 90%;
  margin: 0 auto;
  display: grid;
  justify-items: center;
  form {
    display: grid;
    width:100%;
    height: 100%;
  }
`
export default memo(PagesContainer);