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
    const [setNewPassword, {
        isLoading: isSettingNewPassword,
        isSuccess: isNewPasswordSet,
    }] = useSetNewPasswordMutation()

    const {register, handleSubmit, formState: {errors}} = useForm<NewPasswordValues>({
        resolver: yupResolver(PasswordSchema)
    })
    const onSubmit: SubmitHandler<NewPasswordValues> = async (data) => {
        const {password} = data
        await setNewPassword({password, resetPasswordToken: token!})
    }

    return isNewPasswordSet ? <Navigate to={PATH.login}/> : (
        <SPagesContainer>
            <SForm onSubmit={handleSubmit(onSubmit)}>
                <STitle>Create new password</STitle>
                <SInputsSection>
                    <PasswordInput
                        placeholder={"Password"}
                        disabled={isSettingNewPassword}
                        error={errors.password?.message}
                        register={register}/>
                    <SHelperText>
                        Create new password and we will send you
                        further instructions to email
                    </SHelperText>
                </SInputsSection>
                <SControlSection>
                    <Button
                        type={"submit"}
                        disabled={isSettingNewPassword}>
                        Create new password
                    </Button>
                </SControlSection>
            </SForm>
        </SPagesContainer>
    );
};
