import React from 'react';
import {ReactComponent as EmailSVG} from "../../../../assets/img/email.svg"
import {Button} from "common/components/Button/Button";
import {useNavigate} from "react-router-dom";
import {PATH} from "common/components/Routes/AppRoutes";
import {secondColor} from "assets/stylesheets/colors";
import styled from "styled-components";
import {
    SButtonControl,
    SControlSection,
    SHelperText,
    SInputsSection,
    SPagesContainer,
    STitle
} from "common/components/CommonStyledComponents";


export const EmailRecovery: React.FC<{ email: string }> =
    ({email}) => {
        const nav = useNavigate()
        const buttonHandler = () => (nav(PATH.login));
        return (
            <SPagesContainer>
                <SInputsSection>
                    <EmailSVG style={{stroke: secondColor}}/>
                    <STitle>Check Email</STitle>
                    <SSHelperText>
                        We've sent an Email with instructions to <b>{email}</b>
                    </SSHelperText>
                </SInputsSection>
                <SControlSection>
                    <SButtonControl>
                        <Button
                            onClick={buttonHandler}>
                            Back to login
                        </Button>
                    </SButtonControl>
                </SControlSection>
            </SPagesContainer>
        );
    };
const SSHelperText = styled(SHelperText)`
    text-align: center;
`
