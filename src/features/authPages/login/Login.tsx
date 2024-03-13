import React, {useEffect} from 'react';
import {Button} from "common/components/Button/Button";
import {PATH} from "common/components/Routes/AppRoutes";
import {HelperLink} from "common/components/HelperLink/HelperLink";
import styled from "styled-components";
import {Input} from "common/components/Inputs/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {Checkbox} from "common/components/Checkbox/Checkbox";
import {NavLink, useNavigate} from "react-router-dom";
import {useLoginMutation} from "../authApi";
import {yupResolver} from "@hookform/resolvers/yup";
import {LoginSchema} from "utils/YupValidators/Validators";
import {
    SButtonControl,
    SControlSection,
    SForm,
    SHelperText,
    SPagesContainer,
    STitle
} from "common/components/CommonStyledComponents";
import {PasswordInput} from "common/components/Inputs/PasswordInput/PasswordInput";
import {useAppSelector} from "common/hooks/hooks";
import {selectAppData} from "app/appSlice";

type LoginValues = {
    email: string
    password: string
    rememberMe: boolean
}
export default function Login() {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<LoginValues>({
        resolver: yupResolver(LoginSchema)
    })

    const nav = useNavigate()

    const {
        isSuccess: isAppInitializedSuccessfully,
    } = useAppSelector(selectAppData)

    const [login, {isLoading, isSuccess}] = useLoginMutation()
    const shouldControlDisabled = isLoading || isSuccess

    const onSubmit: SubmitHandler<LoginValues> = async (data) => {
        await login(data)
    }

    useEffect(() => {
        isAppInitializedSuccessfully && nav(PATH.packs)
    }, [isAppInitializedSuccessfully, nav]);

    return (
        <SPagesContainer>
            <SForm
                onSubmit={handleSubmit(onSubmit)}>
                <STitle>Sing In</STitle>
                <Input
                    placeholder={"Email"}
                    disabled={shouldControlDisabled}
                    error={errors.email?.message}
                    register={register}/>
                <PasswordInput
                    placeholder={"Password"}
                    disabled={shouldControlDisabled}
                    error={errors.password?.message}
                    register={register}/>
                <Checkbox
                    disabled={shouldControlDisabled}
                    register={register}
                    registerFieldName={'rememberMe'}>
                    Remember me
                </Checkbox>
                <FP>
                    <NavLink to={PATH.passwordRecovery}>
                        Forgot password
                    </NavLink>
                </FP>
                <SControlSection>
                    <SButtonControl>
                        <Button
                            type={"submit"}
                            disabled={shouldControlDisabled}>
                            Login
                        </Button>
                    </SButtonControl>
                    <SHelperText>Don't have an account?</SHelperText>
                    <HelperLink path={PATH.register}>Sing Up</HelperLink>
                </SControlSection>
            </SForm>
        </SPagesContainer>
    );
};
const FP = styled.div`
    justify-self: end;
    padding: 20px 0;

    a {
        color: black;
        text-decoration: none;
    }
`
