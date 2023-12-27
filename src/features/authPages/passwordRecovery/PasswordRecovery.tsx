import React, {useState} from 'react';
import AppForm from "../AuthPagesContainer/AuthPagesContainer";
import Title from "../../../common/components/Title/Title";
import HelperText from "../../../common/components/HelperText/HelperText";
import Button from "../../../common/components/Button/Button";
import HelperLink from "../../../common/components/HelperLink/HelperLink";
import {LoginPath} from "../../../common/components/Routes/AppRoutes";
import ControlSection from "../ControlSection/ControlSection";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "../../../common/components/Input/Input";
import InputsSection from "../InputsSection/InputsSection";
import EmailRecovery from "./EmailRecovery/EmailRecovery";
import {yupResolver} from "@hookform/resolvers/yup";
import {EmailSchema} from "../YupValidators/Validators";
import {useRecoveryPasswordMutation} from "../../../dal/api/apiSlice";

type RecoveryValues = { email: string }
const PasswordRecovery = () => {

    const [recoveryPassport, {isLoading, isSuccess}] = useRecoveryPasswordMutation()
    const [email, setEmail] = useState<string>("")
    const {register, handleSubmit, formState: {errors}} = useForm<RecoveryValues>({
        resolver: yupResolver(EmailSchema)

    })

    const onSubmit: SubmitHandler<RecoveryValues> = (data) => {
        recoveryPassport(data)
        setEmail(data.email)
    }

    return isSuccess ? <EmailRecovery email={email}/> : (
        <form onSubmit={handleSubmit(onSubmit)}>
            <AppForm>
                <Title>Forgot your password?</Title>
                <InputsSection>
                    <Input
                        label={'Email'}
                        disabled={isLoading}
                        error={errors.email?.message}
                        register={register}/>
                    <HelperText>
                        Enter your email address and we will send
                        you further instructions
                    </HelperText>
                </InputsSection>
                <ControlSection>
                    <Button
                        disabled={isLoading}>
                        Send Instructions
                    </Button>
                    <HelperText>
                        Did you remember your password?
                    </HelperText>
                    <HelperLink path={LoginPath}>
                        Try logging in
                    </HelperLink>
                </ControlSection>
            </AppForm>
        </form>
    );
};

export default PasswordRecovery;