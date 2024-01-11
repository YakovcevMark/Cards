import React from 'react';
import PagesContainer from "../AuthPagesContainer/AuthPagesContainer";
import Input from '../../../common/components/Input/Input';
import Title from "../../../common/components/Title/Title";
import {StyledHelperText} from "../../../common/components/HelperText/StyledHelperText";
import Button from "../../../common/components/Button/Button";
import InputsSection from "../InputsSection/InputsSection";
import ControlSection from "../ControlSection/ControlSection";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {PasswordSchema} from "../../../utils/YupValidators/Validators";
import {useSetNewPasswordMutation} from "../authApi";
import {Navigate, useParams} from "react-router-dom";
import {LoginPath} from "../../../common/components/Routes/AppRoutes";

type NewPasswordValues = {
    password: string
}
const PasswordNew = () => {

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
        <PagesContainer>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Title>Create new password</Title>
                <InputsSection>
                    <Input
                        type={'password'}
                        label={"Password"}
                        disabled={isLoading}
                        error={errors.password?.message}
                        register={register}/>
                    <StyledHelperText>
                        Create new password and we will send you
                        further instructions to email
                    </StyledHelperText>
                </InputsSection>
                <ControlSection>
                    <Button
                        disabled={isLoading}>
                        Create new password
                    </Button>
                </ControlSection>
            </form>
        </PagesContainer>
    );
};

export default PasswordNew;