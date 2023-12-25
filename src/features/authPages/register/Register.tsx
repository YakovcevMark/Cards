import React from 'react';
import Title from "../../../common/components/Title/Title";
import Input from "../../../common/components/Input/Input";
import Button from "../../../common/components/Button/Button";
import AppForm from "../../../common/components/Form/AppForm";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {LoginPath} from "../../../common/components/Routes/AppRoutes";
import {SubmitHandler, useForm} from "react-hook-form";

export type RegisterFormValues = {
    email: string
    password: string
    confirmPassword: string
}
const Register = () => {
    const navigate = useNavigate()
    const {register, handleSubmit} = useForm<RegisterFormValues>()
    const cancelButtonHandler = () => {
        navigate(`/${LoginPath}`, {replace: true});
    }
    const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
        alert(JSON.stringify(data))
    }
    console.log(register("email"))
    return (
        <AppForm onSubmit={handleSubmit(onSubmit)}>
            <Title>Sing Up</Title>
            <input {...register("email")}/>
            {/*<Input*/}
            {/*    label={"Email"}*/}
            {/*    {...register("email")}/>*/}
            <Input
                label={"Password"}
                type={"password"}
                register = {register}/>
            <Input
                label={"Confirm password"}
                type={"password"}
                register={register}/>
            <ButtonControl>
                <Button gray
                        onClick={cancelButtonHandler}>
                    Cancel
                </Button>
                <Button>Register</Button>
            </ButtonControl>
        </AppForm>
    );
};
const ButtonControl = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
`
export default Register;