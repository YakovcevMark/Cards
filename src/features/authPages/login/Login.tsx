import React, {memo} from 'react';
import Title from "../../../common/components/Title/Title";
import Button from "../../../common/components/Button/Button";
import {PasswordRecoveryPath, RegisterPath} from "../../../common/components/Routes/AppRoutes";
import PagesContainer from "../AuthPagesContainer/AuthPagesContainer";
import HelperLink from "../../../common/components/HelperLink/HelperLink";
import {StyledHelperText} from "../../../common/components/HelperText/StyledHelperText";
import styled from "styled-components";
import Input from "../../../common/components/Input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import Checkbox from "../../../common/components/Checkbox/Checkbox";
import {NavLink} from "react-router-dom";
import ControlSection from "../ControlSection/ControlSection";
import {useLoginMutation} from "../authApi";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginSchema} from "../../../utils/YupValidators/Validators";
import {useApiErrorsHandler} from "../../../common/hooks/hooks";

type LoginValues = {
    email: string
    password: string
    rememberMe: boolean
}
const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginValues>({
        resolver: yupResolver(LoginSchema)
    })
    const [login, {isLoading}] = useLoginMutation()
    const loginValidator = useApiErrorsHandler(login,true)
    const onSubmit: SubmitHandler<LoginValues> = async (data) => {
        await loginValidator(data)
    }
    return (
        <PagesContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                    <Title>Sing In</Title>
                    <Input
                        label={"Email"}
                        disabled={isLoading}
                        error={errors.email?.message}
                        register={register}
                    />
                    <Input
                        label={"Password"}
                        type={"password"}
                        disabled={isLoading}
                        error={errors.password?.message}
                        register={register}
                    />
                    <Checkbox
                        disabled={isLoading}
                        register={register}
                        fieldName={'rememberMe'}>
                        Remember me
                    </Checkbox>
                    <FP>
                        <NavLink to={PasswordRecoveryPath}>
                            Forgot password
                        </NavLink>
                    </FP>
                <ControlSection>
                    <ButtonControl>
                        <Button
                            disabled={isLoading}>
                            Login
                        </Button>
                    </ButtonControl>
                    <StyledHelperText>Don't have an account?</StyledHelperText>
                    <HelperLink path={RegisterPath}>Sing Up</HelperLink>
                </ControlSection>
            </form>
        </PagesContainer>
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
export const ButtonControl = styled.div`
  width: 80%;

  button {
    width: 100%;
  }
`
export default memo(Login);