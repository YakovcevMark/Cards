import React, {memo} from 'react';
import Title from "../../../common/components/Title/Title";
import Button from "../../../common/components/Button/Button";
import {PasswordRecoveryPath, ProfilePath, RegisterPath} from "../../../common/components/Routes/AppRoutes";
import AppForm from "../AuthPagesContainer/AuthPagesContainer";
import HelperLink from "../../../common/components/HelperLink/HelperLink";
import HelperText from "../../../common/components/HelperText/HelperText";
import styled from "styled-components";
import Input from "../../../common/components/Input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import Checkbox from "../../../common/components/Checkbox/Checkbox";
import {Navigate, NavLink} from "react-router-dom";
import ControlSection from "../ControlSection/ControlSection";
import {useLoginMutation} from "../../../dal/api/apiSlice";

type LoginValues = {
    email: string
    password: string
    rememberMe: boolean
}
const Login = () => {
    const {register, handleSubmit} = useForm<LoginValues>()
    const [login, {isSuccess}] = useLoginMutation()
    const onSubmit: SubmitHandler<LoginValues> = async (data) => {
        await login(data)
    }
    if (isSuccess) return <Navigate to={`/${ProfilePath}`}/>
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <AppForm>

                <Title>Sing In</Title>
                <Input
                    label={"Email"}
                    register={register}
                />
                <Input
                    label={"Password"}
                    type={"password"}
                    register={register}
                />
                <Checkbox
                    register={register}
                    fieldName={'rememberMe'}>
                    Remember me
                </Checkbox>
                <FP>
                    <NavLink to={`/${PasswordRecoveryPath}`}>
                        Forgot password
                    </NavLink>
                </FP>
                <ControlSection>
                    <ButtonControl>
                        <Button>Login</Button>
                    </ButtonControl>
                    <HelperText>Don't have an account?</HelperText>
                    <HelperLink path={RegisterPath}>Sing Up</HelperLink>
                </ControlSection>
            </AppForm>
        </form>
    );
};
const FP = styled.div`
  justify-self: end;
  padding: 20px 0;

  a {
    color: black;
    text-decoration: none;
  }
`
const ButtonControl = styled.div`
  width: 80%;

  button {
    width: 100%;
  }

`
export default memo(Login);