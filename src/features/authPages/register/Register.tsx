import React from 'react';
import Title from "../../../common/components/Title/Title";
import Input from "../../../common/components/Input/Input";
import Button from "../../../common/components/Button/Button";
import AppForm from "../AuthPagesContainer/AuthPagesContainer";
import styled from "styled-components";
import {Navigate, useNavigate} from "react-router-dom";
import {LoginPath, ProfilePath} from "../../../common/components/Routes/AppRoutes";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRegisterMutation} from "../../../dal/api/apiSlice";
import ControlSection from "../ControlSection/ControlSection";
import InputsSection from "../InputsSection/InputsSection";

export type RegisterFormValues = {
    email: string
    password: string
    confirmPassword: string
}

const Register = () => {
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}} = useForm<RegisterFormValues>()
    const [getRegistered, {isSuccess}] = useRegisterMutation()

    const cancelButtonHandler = () => {
        navigate(`/${LoginPath}`, {replace: true});
    }
    const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
        const {email, password} = data
        getRegistered({email, password});
    }
    if (isSuccess) {
        return <Navigate to={ProfilePath}/>
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <AppForm>
                <InputsSection>
                    <Title>Sing Up</Title>
                    <Input
                        label={"Email"}
                        register={register}
                        error={errors.email?.message}/>
                    <Input
                        label={"Password"}
                        type={"password"}
                        register={register}/>

                    <Input
                        label={"Confirm password"}
                        type={"password"}
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