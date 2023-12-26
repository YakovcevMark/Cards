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

type RecoveryValues = { email: string }
const PasswordRecovery = () => {
    const [email, sEmail] = useState("")
    const {register, handleSubmit} = useForm<RecoveryValues>()
    const onSubmit: SubmitHandler<RecoveryValues> = (data) => {
        sEmail(data.email)
    }
    return email ? <EmailRecovery email={email}/> : (
        <form onSubmit={handleSubmit(onSubmit)}>
            <AppForm>
                <Title>Forgot your password?</Title>
                <InputsSection>

                    <Input
                        label={'Email'}
                        register={register}/>
                    <HelperText>
                        Enter your email address and we will send
                        you further instructions
                    </HelperText>
                </InputsSection>
                <ControlSection>
                    <Button>
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