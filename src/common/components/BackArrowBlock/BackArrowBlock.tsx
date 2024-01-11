import React, {ButtonHTMLAttributes, DetailedHTMLProps, memo} from 'react';
import styled from "styled-components";
import {KeyboardBackspace} from "@styled-icons/material-outlined";
import {PacksPath} from "../Routes/AppRoutes";
import {useNavigate} from "react-router-dom";

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
export const BackArrowBlock = memo(
    ({
         ...props
     }: DefaultButtonPropsType) => {

        const nav = useNavigate()
        const backButtonHandler = () => nav(PacksPath)

        return (
            <StyledBackArrowBlock
                onClick={backButtonHandler}
                {...props}>
                <KeyboardBackspace/>
                Back to Packs List
            </StyledBackArrowBlock>
        )
    }
)


const StyledBackArrowBlock = styled.button`
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;

  border: none;
  width: 18vh;
  height: 5vh;

  display: grid;
  grid-template-columns: 2.5vh 1fr;
  align-items: center;
  cursor: pointer;
  z-index: 2;
`