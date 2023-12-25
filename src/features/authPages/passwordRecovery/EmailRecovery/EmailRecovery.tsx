import React from 'react';
import AppForm from "../../../../common/components/Form/AppForm";
import emailSVG from "../../../../assets/img/email.svg"
import Title from "../../../../common/components/Title/Title";
import HelperText from "../../../../common/components/HelperText/HelperText";
const EmailRecovery:React.FC<{email:string}> =
    ({email}) => {
    return (
        <AppForm>
            {emailSVG}
            <Title>Check Email</Title>
            <HelperText>
                We've sent an Email with instructions to
                {email}
            </HelperText>
        </AppForm>
    );
};

export default EmailRecovery;