import React from 'react';
import {Button} from "../../../common/components/Button/Button";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {PasswordSchema} from "../../../utils/YupValidators/Validators";
import {useSetNewPasswordMutation} from "../authApi";
import {Navigate, useParams} from "react-router-dom";
import {LoginPath} from "../../../common/components/Routes/AppRoutes";
import {AuthPagesContainer} from "../AuthPagesContainer/AuthPagesContainer";
import {SHelperText, STitle} from "../../../common/components/CommonStyledComponents";
import {SInputsSection, SControlSection} from "../AuthStyledComponents";
import {Input} from "../../../common/components/Input/Input";

type NewPasswordValues = {
    password: string
}
export const PasswordNew = () => {

    const {token} = useParams()
    const [recoveryPassport, {isLoading, isSuccess}] = useSetNewPasswordMutation()
    const {register, handleSubmit, formState: {errors}} = useForm<NewPasswordValues>({
        resolver: yupResolver(PasswordSchema)
    })

    const onSubmit: SubmitHandler<NewPasswordValues> = (data) => {
        const {password} = data
        recoveryPassport({password, resetPasswordToken: token!})
    }

    return isSuccess ? <Navigate to={LoginPath}/> : (
        <AuthPagesContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <STitle>Create new password</STitle>
                <SInputsSection>
                    <Input
                        type={'password'}
                        label={"Password"}
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
            </form>
        </AuthPagesContainer>
    );
};
