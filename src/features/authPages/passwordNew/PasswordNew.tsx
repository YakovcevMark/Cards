import React from 'react';
import AppForm from "../AuthPagesContainer/AuthPagesContainer";
import Input from '../../../common/components/Input/Input';
import Title from "../../../common/components/Title/Title";
import HelperText from "../../../common/components/HelperText/HelperText";
import Button from "../../../common/components/Button/Button";
import InputsSection from "../InputsSection/InputsSection";
import ControlSection from "../ControlSection/ControlSection";
import {SubmitHandler, useForm} from "react-hook-form";

type NewPasswordValues = {
    password: string
}
const PasswordNew = () => {
    const {register, handleSubmit} = useForm<NewPasswordValues>()
    const onSubmit: SubmitHandler<NewPasswordValues> = (data) => {
        alert(JSON.stringify(data))
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <AppForm>
                <Title>Create new password</Title>
                <InputsSection>
                    <Input
                        type={'password'}
                        label={"Password"}
                        register={register}/>
                    <HelperText>
                        Create new password and we will send you
                        further instructions to email
                    </HelperText>
                </InputsSection>
                <ControlSection>
                    <Button>Create new password</Button>
                </ControlSection>
            </AppForm>
        </form>
    );
};

export default PasswordNew;