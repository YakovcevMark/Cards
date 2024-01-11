import React, {useState} from 'react';
import Title from "../../../common/components/Title/Title";
import {StyledHelperText} from "../../../common/components/HelperText/StyledHelperText";
import Button from "../../../common/components/Button/Button";
import HelperLink from "../../../common/components/HelperLink/HelperLink";
import {LoginPath} from "../../../common/components/Routes/AppRoutes";
import ControlSection from "../ControlSection/ControlSection";
import {SubmitHandler, useForm} from "react-hook-form";
import Input from "../../../common/components/Input/Input";
import InputsSection from "../InputsSection/InputsSection";
import {EmailRecovery} from "./EmailRecovery/EmailRecovery";
import {yupResolver} from "@hookform/resolvers/yup";
import {EmailSchema} from "../../../utils/YupValidators/Validators";
import {useRecoveryPasswordMutation} from "../authApi";
import {ButtonControl} from "../login/Login";
import PagesContainer from "../AuthPagesContainer/AuthPagesContainer";

type RecoveryValues = { email: string }
const PasswordRecovery = () => {

    const [recoveryPassport, { isLoading }] = useRecoveryPasswordMutation()
    const [email, setEmail] = useState<string>("")


    const {register, handleSubmit, formState: {errors}} = useForm<RecoveryValues>({
        resolver: yupResolver(EmailSchema)

    })

    const onSubmit: SubmitHandler<RecoveryValues> = (data) => {
        recoveryPassport(data)
        setEmail(data.email)
    }

    return email ? <EmailRecovery email={email}/> : (
            <PagesContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                <Title>Forgot your password?</Title>
                <InputsSection>
                    <Input
                        label={'Email'}
                        disabled={isLoading}
                        error={errors.email?.message}
                        register={register}/>
                    <StyledHelperText>
                        Enter your email address and we will send
                        you further instructions
                    </StyledHelperText>
                </InputsSection>
                <ControlSection>
                    <ButtonControl>
                        <Button
                            disabled={isLoading}>
                            Send Instructions
                        </Button>
                    </ButtonControl>
                    <StyledHelperText>
                        Did you remember your password?
                    </StyledHelperText>
                    <HelperLink path={LoginPath}>
                        Try logging in
                    </HelperLink>
                </ControlSection>
                </form>
            </PagesContainer>
    );
};
export default PasswordRecovery;