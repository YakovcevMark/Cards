import React, {useState} from 'react';
import {Input, InputPT} from "common/components/Inputs/Input";
import {Visibility, VisibilityOff} from "@styled-icons/material";
import {SDopInputControl} from "common/components/CommonStyledComponents";
import styled from "styled-components";

export const PasswordInput =
    ({
         type,
         ...props
     }: InputPT) => {
        const [seeMode, setSeeMode] = useState(false)
        const eyeHandle = (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault()
            setSeeMode(!seeMode)
        };
        return (
            <Input
                type={seeMode ?  "" : "password"}
                {...props}>
                <SEye
                    onClick={eyeHandle}>
                    {seeMode
                        ? <VisibilityOff/>
                        : <Visibility/>
                    }
                </SEye>
            </Input>
        );
    };
const SEye = styled(SDopInputControl)`
    top: 19px;
    right: 15px;
`