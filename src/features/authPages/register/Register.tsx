import React from 'react';
import Title from "../../../common/components/Title/Title";
import Input from "../../../common/components/Input/Input";
import Button from "../../../common/components/Button/Button";
import AppForm from "../../../common/components/PagesContainer/PagesContainer";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {LoginPath} from "../../../common/components/Routes/AppRoutes";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRegisterMutation} from "../../../dal/api/apiSlice";
import ControlSection from "../ControlSection/ControlSection";
import InputsSection from "../InputsSection/InputsSection";
import {yupResolver} from "@hookform/resolvers/yup";
import {RegisterSchema} from "../YupValidators/Validators";

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
    const [getRegistered, {isSuccess,isLoading}] = useRegisterMutation()

    const cancelButtonHandler = () => {
        navigate(`/${LoginPath}`, {replace: true});
    }
    const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
        const {email, password} = data
        getRegistered({email, password});
    }

    if (isSuccess) {
        navigate(`/${LoginPath}`);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <AppForm>
                <InputsSection>
                    <Title>Sing Up</Title>
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
            </AppForm>
        </form>
    );
};

const ButtonControl = styled.div`
  justify-content: space-between;
  display: grid;
  grid-template-columns:45% 50%;
  width: 100%;
`
export default Register;