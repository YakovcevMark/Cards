import React, {memo} from 'react';
import Title from "../../../common/components/Title/Title";
import Button from "../../../common/components/Button/Button";
import Input from "../../../common/components/Input/Input";
import {PasswordRecoveryPath, RegisterPath} from "../../../common/components/Routes/AppRoutes";
import AppForm from "../../../common/components/Form/AppForm";
import HelperLink from "../../../common/components/HelperLink/HelperLink";
import HelperText from "../../../common/components/HelperText/HelperText";
import styled from "styled-components";

const Login = () => {
    return (
        <AppForm
        >
            <Title>Sing In</Title>
            {/*<Input*/}
            {/*    placeholder={"Email"}*/}
            {/*/>*/}
            {/*<Input*/}
            {/*    placeholder={"Password"}*/}
            {/*    type={"password"}*/}
            {/*/>*/}
            <FP href={PasswordRecoveryPath}>Forgot password</FP>
            <ButtonControl> <Button>Login</Button></ButtonControl>

            <HelperText>Don't have an account?</HelperText>
            <HelperLink path={RegisterPath}>Sing Up</HelperLink>
        </AppForm>
    );
};
const FP = styled.a`
  display: grid;
  align-self: end;
  padding: 20px;
  color:black;
  text-decoration: none;
`
const ButtonControl = styled.div`
  display: grid;
  width: 80%;
`
export default memo(Login);