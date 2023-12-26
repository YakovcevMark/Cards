import React from 'react';
import emailPNG from "../../../../assets/img/email.png"
import Title from "../../../../common/components/Title/Title";
import HelperText from "../../../../common/components/HelperText/HelperText";
import InputsSection from "../../InputsSection/InputsSection";
import ControlSection from "../../ControlSection/ControlSection";
import Button from "../../../../common/components/Button/Button";
import {useNavigate} from "react-router-dom";
import {LoginPath} from "../../../../common/components/Routes/AppRoutes";
import AppForm from "../../AuthPagesContainer/AuthPagesContainer";
import styled from "styled-components";

const EmailRecovery: React.FC<{ email: string }> =
    ({email}) => {
        const nav = useNavigate()
        const buttonHandler = () => (nav(`/${LoginPath}`));
        return (
            <AppForm>
                <InputsSection>
                    <PNG src={emailPNG} alt=""/>
                    <Title>Check Email</Title>
                    <HelperText style={{textAlign: "center"}}>
                        We've sent an Email with instructions to <b>{email}</b>
                    </HelperText>
                </InputsSection>
                <ControlSection>
                    <Button
                        onClick={buttonHandler}>
                        Back to login
                    </Button>
                </ControlSection>
            </AppForm>
        );
    };
const PNG = styled.img`
  width: 108px;
  height: 108px;
`
export default EmailRecovery;