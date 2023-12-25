import React from 'react';
import AppForm from "../../../common/components/Form/AppForm";
import Input from '../../../common/components/Input/Input';
import Title from "../../../common/components/Title/Title";
import HelperText from "../../../common/components/HelperText/HelperText";
import Button from "../../../common/components/Button/Button";

const PasswordNew = () => {
    return (
        <AppForm>
            <Title>Create new password</Title>
            {/*<Input*/}
            {/*    type={'password'}*/}
            {/*    placeholder={"Password"}/>*/}


            <HelperText>
                Create new password and we will send you
                further instructions to email
            </HelperText>
            <Button>Create new password</Button>
        </AppForm>
    );
};

export default PasswordNew;