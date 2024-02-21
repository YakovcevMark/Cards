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
    SControlSection,
    SForm,
    SHelperText,
    SInputsSection,
    SPagesContainer,
    STitle
} from "common/components/CommonStyledComponents";

type RecoveryValues = { email: string }
export default function PasswordRecovery() {

    const [recoveryPassport, {
        isLoading: isSendingInstructions,
        isSuccess: isInstructionsSended
    }] = useRecoveryPasswordMutation()

    const [email, setEmail] = useState<string>("")

    const {register, handleSubmit, formState: {errors}} = useForm<RecoveryValues>({
        resolver: yupResolver(EmailSchema)

    })
    const onSubmit: SubmitHandler<RecoveryValues> = async (data) => {
        await recoveryPassport(data)
        setEmail(data.email)
    }

    return email && isInstructionsSended ? <EmailRecovery email={email}/> : (
        <SPagesContainer>
            <SForm onSubmit={handleSubmit(onSubmit)}>
                <STitle>Forgot your password?</STitle>
                <SInputsSection>
                    <Input
                        placeholder={'Email'}
                        disabled={isSendingInstructions}
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
                            type={"submit"}
                            disabled={isSendingInstructions}>
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