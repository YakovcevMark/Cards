import React from 'react';
import AppForm from "../../../common/components/Form/AppForm";
import Title from "../../../common/components/Title/Title";
import Input from "../../../common/components/Input/Input";
import HelperText from "../../../common/components/HelperText/HelperText";
import Button from "../../../common/components/Button/Button";
import HelperLink from "../../../common/components/HelperLink/HelperLink";
import {LoginPath} from "../../../common/components/Routes/AppRoutes";

const PasswordRecovery = () => {
    return (
        <AppForm>
            <Title>Forgot your password?</Title>
            {/*<Input placeholder={'Email'}/>*/}
            <HelperText>
                Enter your email address and we will send
                you further instructions
            </HelperText>
            <Button>
                Send Instructions
            </Button>
            <HelperText>
                Did you remember your password?
            </HelperText>
            <HelperLink path={LoginPath}>
                Try logging in
            </HelperLink>
        </AppForm>
    );
};

export default PasswordRecovery;