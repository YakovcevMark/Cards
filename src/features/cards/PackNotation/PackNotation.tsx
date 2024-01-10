import React, {memo} from 'react';
import Button from "../../../common/components/Button/Button";
import {DeleteOutline, DriveFileRenameOutline, School} from "@styled-icons/material-outlined";
import styled from "styled-components";

type PT = {
    id: string
    name: string
    cardsCount: number
    updated: string
    userId: string
}
export const PackNotation = memo(
    ({
         id,
         name,
         cardsCount,
         updated,
         userId
     }: PT) => {
        const renderedName = name.length > 23 ? name.substring(0, 23).concat("...") : name;
        return (
            <StyledPackNotation>
                <NotationName
                    onClick = {() => console.log(id)}>
                    {renderedName}
                </NotationName>
                <td>{cardsCount}</td>
                <td>{updated}</td>
                <td>{userId}</td>
                <ActionButtons>
                    <Button
                        icon>
                        <School/>
                    </Button>
                    <Button
                        icon>
                        <DriveFileRenameOutline/>
                    </Button>
                    <Button
                        icon>
                        <DeleteOutline/>
                    </Button>
                </ActionButtons>
            </StyledPackNotation>
        );
    }
);
const NotationName = styled.td`
  //width: 40vh;
    &:hover{
      cursor: pointer;
    }
`
const ActionButtons = styled.td`
  width:16vh;
  button {
    margin: 0 5px;
  }
  
`
const StyledPackNotation = styled.tr`
  height: auto;
  padding-bottom: 1vh;
  background-color: burlywood;
  border-bottom: 3px solid blue;

`