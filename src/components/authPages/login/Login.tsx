import React from 'react';
import Title from "../../common/Title/Title";
import Button from "../../common/Button/Button";
import s from "./Login.module.scss"
import Input from "../../common/Input/Input";
const Login = () => {
    return (
        <div className={s.content}>
            <Title>Sing Up</Title>
            <Input></Input>
            <Button>Sing Up</Button>
        </div>
    );
};

export default Login;