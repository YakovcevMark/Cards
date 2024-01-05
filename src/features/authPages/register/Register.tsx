import React from 'react';
import Title from "../../../common/components/Title/Title";
import Input from "../../../common/components/Input/Input";
import Button from "../../../common/components/Button/Button";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {LoginPath} from "../../../common/components/Routes/AppRoutes";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRegisterMutation} from "../../../dal/api/apiSlice";
import ControlSection from "../ControlSection/ControlSection";
import InputsSection from "../InputsSection/InputsSection";
import {yupResolver} from "@hookform/resolvers/yup";
import {RegisterSchema} from "../../../utils/YupValidators/Validators";
import PagesContainer from "../../../common/components/PagesContainer/PagesContainer";
import {useApiErrorsHandler} from "../../../common/hooks/hooks";

export type RegisterFormValues = {
    email: string
    password: string
    confirmPassword: string
}
const Register = () => {
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
        <PagesContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Title>Sing Up</Title>

                <InputsSection>
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
                </InputsSection>
                <ControlSection>
                    <ButtonControl>
                        <Button gray
                                onClick={cancelButtonHandler}>
                            Cancel
                        </Button>
                        <Button>
                            Register
                        </Button>
                    </ButtonControl>
                </ControlSection>
            </form>
        </PagesContainer>

    );
};

const ButtonControl = styled.div`
  justify-content: space-between;
  display: grid;
  grid-template-columns:45% 50%;
  width: 100%;
`
export default Register;