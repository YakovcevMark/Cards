import React, {useState} from 'react';
import {Button} from "common/components/Button/Button";
import {HelperLink} from "common/components/HelperLink/HelperLink";
import {PATH} from "common/components/Routes/AppRoutes";
import {SubmitHandler, useForm} from "react-hook-form";
import {Input} from "common/components/Inputs/Input";
import {EmailRecovery} from "./EmailRecovery/EmailRecovery";
import {yupResolver} from "@hookform/resolvers/yup";
import {EmailSchema} from "utils/YupValidators/Validators";
import {useRecoveryPasswordMutation} from "../authApi";
import {
    SButtonControl,
    SControlSection, SForm,
    SHelperText,
    SInputsSection,
    SPagesContainer,
    STitle
} from "common/components/CommonStyledComponents";

type RecoveryValues = { email: string }
export const PasswordRecovery = () => {

    const [recoveryPassport, {isLoading}] = useRecoveryPasswordMutation()
    const [email, setEmail] = useState<string>("")


    const {register, handleSubmit, formState: {errors}} = useForm<RecoveryValues>({
        resolver: yupResolver(EmailSchema)

    })

    const onSubmit: SubmitHandler<RecoveryValues> = (data) => {
        recoveryPassport(data)
        setEmail(data.email)
    }

    return email ? <EmailRecovery email={email}/> : (
        <SPagesContainer>
            <SForm onSubmit={handleSubmit(onSubmit)}>
                <STitle>Forgot your password?</STitle>
                <SInputsSection>
                    <Input
                        placeholder={'Email'}
                        disabled={isLoading}
                        error={errors.email?.message}
                        register={register}/>
                    <SHelperText>
                        Enter your email address and we will send
                        you further instructions
                    </SHelperText>
                </SInputsSection>
                <SControlSection>
                    <SButtonControl>
                        <Button
                            disabled={isLoading}>
                            Send Instructions
                        </Button>
                    </SButtonControl>
                    <SHelperText>
                        Did you remember your password?
                    </SHelperText>
                    <HelperLink path={PATH.login}>
                        Try logging in
                    </HelperLink>
                </SControlSection>
            </SForm>
        </SPagesContainer>
    );
};