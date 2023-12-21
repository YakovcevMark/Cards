import React from 'react';
import Title from "../../../common/components/Title/Title";
import Button from "../../../common/components/Button/Button";
import s from "./Login.module.scss"
import Input from "../../../common/components/Input/Input";
import HelperText from "../../../common/components/HelperText/HelperText";
import HelperLink from "../../../common/components/HelperLink/HelperLink";
import {RegisterPath} from "../../../common/components/Routes/AppRoutes";
const Login = () => {
    return (
        <form className={s.content}>
            <Title>Sing In</Title>
            <Input
                placeholder={"Email"}/>
            <Input
                placeholder={"Password"}
                type={"password"}/>
            <Button>Login</Button>
            <HelperText>Don't have an account?</HelperText>
            <HelperLink path={RegisterPath}>Sing Up</HelperLink>
        </form>
    );
};

export default Login;