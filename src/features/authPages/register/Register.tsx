import React from 'react';
import {Input} from "common/components/Input/Input";
import {Button} from "common/components/Button/Button";
import {useNavigate} from "react-router-dom";
import {PATH} from "common/components/Routes/AppRoutes";
import {SubmitHandler, useForm} from "react-hook-form";
import {useRegisterMutation} from "../authApi";
import {yupResolver} from "@hookform/resolvers/yup";
import {RegisterSchema} from "utils/YupValidators/Validators";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {
    SForm,
    SInputsSection,
    SPagesContainer,
    STitle
} from "common/components/CommonStyledComponents";
import {SModalControlSection} from "features/Modals/ModalsStyledComponents";

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

    const getRegisterValidator = useApiErrorsHandler(getRegister)
    const cancelButtonHandler = () => {
        navigate(PATH.login);
    }
    const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
        const {email, password} = data
        await getRegisterValidator({email, password})
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
