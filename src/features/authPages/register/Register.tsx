import React from 'react';
import {Input} from "../../../common/components/Input/Input";
import {Button} from "../../../common/components/Button/Button";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {LoginPath} from "../../../common/components/Routes/AppRoutes";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRegisterMutation} from "../authApi";
import {yupResolver} from "@hookform/resolvers/yup";
import {RegisterSchema} from "../../../utils/YupValidators/Validators";
import {AuthPagesContainer} from "../AuthPagesContainer/AuthPagesContainer";
import {useApiErrorsHandler} from "../../../common/hooks/hooks";
import {SControlSection, SInputsSection} from "../AuthStyledComponents";
import {STitle} from "../../../common/components/CommonStyledComponents";

export type RegisterFormValues = {
    email: string
    password: string
    confirmPassword: string
}
export const Register = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm<RegisterFormValues>({
        resolver: yupResolver(RegisterSchema)
    })
    const [getRegister, {isSuccess, isLoading}] = useRegisterMutation()

    const getRegisterValidator = useApiErrorsHandler(getRegister)
    const cancelButtonHandler = () => {
        navigate(LoginPath);
    }
    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        const {email, password} = data
        await getRegisterValidator({email, password})
    }

    if (isSuccess) {
        navigate(LoginPath);
    }

    return (
        <AuthPagesContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <STitle>Sing Up</STitle>

                <SInputsSection>
                    <Input
                        label={"Email"}
                        disabled={isLoading}
                        error={errors.email?.message}
                        register={register}/>
                    <Input
                        label={"Password"}
                        type={"password"}
                        disabled={isLoading}
                        error={errors.password?.message}
                        register={register}/>
                    <Input
                        label={"Confirm password"}
                        type={"password"}
                        disabled={isLoading}
                        error={errors.confirmPassword?.message}
                        register={register}/>
                </SInputsSection>
                <SControlSection>
                    <SButtonControl>
                        <Button gray
                                onClick={cancelButtonHandler}
                            type={"button"}>
                            Cancel
                        </Button>
                        <Button
                            type={"submit"}>
                            Register
                        </Button>
                    </SButtonControl>
                </SControlSection>
            </form>
        </AuthPagesContainer>

    );
};

const SButtonControl = styled.div`
  justify-content: space-between;
  display: grid;
  grid-template-columns:45% 50%;
  width: 100%;
`