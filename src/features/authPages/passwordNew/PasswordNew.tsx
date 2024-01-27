import React from 'react';
import {Button} from "common/components/Button/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {PasswordSchema} from "utils/YupValidators/Validators";
import {useSetNewPasswordMutation} from "../authApi";
import {Navigate, useParams} from "react-router-dom";
import {PATH} from "common/components/Routes/AppRoutes";
import {
    SControlSection,
    SForm,
    SHelperText,
    SInputsSection,
    SPagesContainer,
    STitle
} from "common/components/CommonStyledComponents";
import {PasswordInput} from "common/components/Inputs/PasswordInput/PasswordInput";

type NewPasswordValues = {
    password: string
}
export const PasswordNew = () => {

    const {token} = useParams()
    const [recoveryPassport, {
        isLoading,
        isSuccess,
    }] = useSetNewPasswordMutation()

    const {register, handleSubmit, formState: {errors}} = useForm<NewPasswordValues>({
        resolver: yupResolver(PasswordSchema)
    })

    const onSubmit: SubmitHandler<NewPasswordValues> = (data) => {
        const {password} = data
        recoveryPassport({password, resetPasswordToken: token!})
    }

    return isSuccess ? <Navigate to={PATH.login}/> : (
        <SPagesContainer>
            <SForm onSubmit={handleSubmit(onSubmit)}>
                <STitle>Create new password</STitle>
                <SInputsSection>
                    <PasswordInput
                        placeholder={"Password"}
                        disabled={isLoading}
                        error={errors.password?.message}
                        register={register}/>
                    <SHelperText>
                        Create new password and we will send you
                        further instructions to email
                    </SHelperText>
                </SInputsSection>
                <SControlSection>
                    <Button
                        disabled={isLoading}>
                        Create new password
                    </Button>
                </SControlSection>
            </SForm>
        </SPagesContainer>
    );
};
