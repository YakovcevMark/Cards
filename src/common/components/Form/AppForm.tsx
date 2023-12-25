import React, {memo} from 'react';
import styled from "styled-components";
type Form =  React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
const AppForm: React.FC<Form> =
    ({children,...props}) => {
        return (
            <SForm {...props}>
                <Container>
                    {children}
                </Container>
            </SForm>
        );
    };
const SForm = styled.form`
  padding-top: 20px;
  border-radius: 10px;
  width: 413px;
  height:600px;
  background: white;
`
const Container = styled.div`
  width: 90%;
  margin:0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export default memo(AppForm);