import React from 'react';
import { ReactComponent as EmailSVG } from "../../../../assets/img/email.svg"
import Title from "../../../../common/components/Title/Title";
import HelperText from "../../../../common/components/HelperText/HelperText";
import InputsSection from "../../InputsSection/InputsSection";
import ControlSection from "../../ControlSection/ControlSection";
import Button from "../../../../common/components/Button/Button";
import {useNavigate} from "react-router-dom";
import {LoginPath} from "../../../../common/components/Routes/AppRoutes";
import AppForm from "../../../../common/components/PagesContainer/PagesContainer";
import {secondColor} from "../../../../assets/stylesheets/colors";
import {ButtonControl} from "../../login/Login";


const EmailRecovery: React.FC<{ email: string }> =
    ({email}) => {
        const nav = useNavigate()
        const buttonHandler = () => (nav(`/${LoginPath}`));
        return (
            <AppForm>
                <InputsSection>
                    <EmailSVG style={{stroke:secondColor}}/>
                    <Title>Check Email</Title>
                    <HelperText style={{textAlign: "center"}}>
                        We've sent an Email with instructions to <b>{email}</b>
                    </HelperText>
                </InputsSection>
                <ControlSection>
                    <ButtonControl>
                        <Button
                            onClick={buttonHandler}>
                            Back to login
                        </Button>
                    </ButtonControl>
                </ControlSection>
            </AppForm>
        );
    };
export default EmailRecovery;