import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import React, {memo, useEffect} from "react";
import {selectAppError, setAppError} from "../../../app/appSlice";
import styled, {keyframes} from "styled-components";

export const Message = memo(
    () => {
        const error = useAppSelector(selectAppError)
        const dispatch = useAppDispatch()

        useEffect(() => {
            if (error) {
                const id = setTimeout(() => {
                    dispatch(setAppError(null))
                }, 5000)
                return () => {
                    clearTimeout(id)
                }
            }
        }, [error, dispatch])

        return error ? <StyledMessage>
                {error}
            </StyledMessage>
            : <></>
    }
);
const opacityKeyframe = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`
const StyledMessage = styled.div`
  position: absolute;
  justify-self: end;
  align-self: end;
  color: #ffffff;
  background-color: #FF8080;
  font-family: 'Source Sans Pro', sans-serif;
  border-radius: .5em;
  border: 1px solid;
  margin: 10px 0;
  padding: 12px;
  width: 400px;
  opacity: 0.5;
  transition: opacity 0.2s ease-in-out;
  animation: ${opacityKeyframe} 2.5s alternate infinite;
`