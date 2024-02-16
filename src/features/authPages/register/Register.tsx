import React from 'react';
import {Input} from "common/components/Inputs/Input";
import {Button} from "common/components/Button/Button";
import {useNavigate} from "react-router-dom";
import {PATH} from "common/components/Routes/AppRoutes";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRegisterMutation} from "../authApi";
import {yupResolver} from "@hookform/resolvers/yup";
import {RegisterSchema} from "utils/YupValidators/Validators";
import {
    SForm,
    SInputsSection,
    SPagesContainer,
    STitle
} from "common/components/CommonStyledComponents";
import {SModalControlSection} from "features/Modals/ModalsStyledComponents";
import {PasswordInput} from "common/components/Inputs/PasswordInput/PasswordInput";

type RegisterFormValues = {
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

    const cancelButtonHandler = () => {
        navigate(PATH.login);
    }
    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        const {email, password} = data
        await getRegister({email, password})
    }

    if (isSuccess) {
        navigate(PATH.login);
    }

    return (
        <SPagesContainer>
            <SForm onSubmit={handleSubmit(onSubmit)}>
                <STitle>Sing Up</STitle>
                <SInputsSection>
                    <Input
                        placeholder={"Email"}
                        disabled={isLoading}
                        error={errors.email?.message}
                        register={register}/>
                    <PasswordInput
                        placeholder={"Password"}
                        disabled={isLoading}
                        error={errors.password?.message}
                        register={register}/>
                    <PasswordInput
                        placeholder={"Confirm password"}
                        disabled={isLoading}
                        error={errors.confirmPassword?.message}
                        register={register}/>
                </SInputsSection>
                <SModalControlSection>
                        <Button gray
                                onClick={cancelButtonHandler}
                                type={"button"}>
                            Cancel
                        </Button>
                        <Button
                            type={"submit"}>
                            Register
                        </Button>
                </SModalControlSection>
            </SForm>
        </SPagesContainer>

    );
};
