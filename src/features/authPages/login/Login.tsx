import React from 'react';
import {Button} from "../../../common/components/Button/Button";
import {PasswordRecoveryPath, RegisterPath} from "../../../common/components/Routes/AppRoutes";
import {HelperLink} from "../../../common/components/HelperLink/HelperLink";
import styled from "styled-components";
import {Input} from "../../../common/components/Input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {Checkbox} from "../../../common/components/Checkbox/Checkbox";
import {NavLink} from "react-router-dom";
import {useLoginMutation} from "../authApi";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginSchema} from "../../../utils/YupValidators/Validators";
import {useApiErrorsHandler} from "../../../common/hooks/hooks";
import {AuthPagesContainer} from "../AuthPagesContainer/AuthPagesContainer";
import {SButtonControl, SControlSection} from "../AuthStyledComponents";
import {SHelperText, STitle} from "../../../common/components/CommonStyledComponents";

type LoginValues = {
    email: string
    password: string
    rememberMe: boolean
}
export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<LoginValues>({
        resolver: yupResolver(LoginSchema)
    })
    const [login, {isLoading}] = useLoginMutation()
    const loginValidator = useApiErrorsHandler(login, true)
    const onSubmit: SubmitHandler<LoginValues> = async (data) => {
        await loginValidator(data)
    }
    return (
        <AuthPagesContainer>
            <form
                onSubmit={handleSubmit(onSubmit)}>
                <STitle>Sing In</STitle>
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
                <SControlSection>
                    <SButtonControl>
                        <Button
                            disabled={isLoading}>
                            Login
                        </Button>
                    </SButtonControl>
                    <SHelperText>Don't have an account?</SHelperText>
                    <HelperLink path={RegisterPath}>Sing Up</HelperLink>
                </SControlSection>
            </form>
        </AuthPagesContainer>
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
