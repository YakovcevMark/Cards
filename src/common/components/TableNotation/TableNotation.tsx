import React, {memo} from 'react';
import {Button} from "../Button/Button";
import {DeleteOutline, DriveFileRenameOutline, School} from "@styled-icons/material-outlined";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {PackPath} from "../Routes/AppRoutes";
// import {ContentPagePT} from "../ContentPage/ContentPage";

// type PT = ContentPagePT & {
type PT = {
    updated: string
    // userId?: string
    question?: string
    answer?: string
    packName?: string
    userName?: string
    cardsCount?: number
    grade?: number
    isOwner: boolean
}
const handleStringLength = (name: string) => {
    return name.length > 23 ? name.substring(0, 23).concat("...") : name;
}
export const TableNotation = memo(
    ({
         cardsCount,
         updated,
         answer,
         grade,
         question,
         userName,
         packName,
         isOwner
     }: PT) => {
        const nav = useNavigate()
        const nameClickHandler = () => {
            nav(PackPath)
        }
        return (
            <StyledNotation>
                {packName && <NotationName
                    onClick={nameClickHandler}>
                    {handleStringLength(packName)}
                </NotationName>
                }
                {question && <td>{handleStringLength(question)}</td>}
                {answer && <td>{handleStringLength(answer)}</td>}
                {cardsCount && <td>{cardsCount}</td>}
                <td>{updated}</td>
                {grade && <td>{grade}</td>}
                {userName && <td>{userName}</td>}
                <ActionButtons>
                    <Button
                        icon>
                        <School/>
                    </Button>
                    {isOwner && <>
                        <Button
                            icon>
                            <DriveFileRenameOutline/>
                        </Button>
                        <Button
                            icon>
                            <DeleteOutline/>
                        </Button>
                    </>
                    }
                </ActionButtons>
            </StyledNotation>
        );
    }
);
const NotationName = styled.td`
    //width: 40vh;

    &:hover {
        cursor: pointer;
    }
`
const ActionButtons = styled.td`
    width: 16vh;

    button {
        margin: 0 5px;
    }
`
const StyledNotation = styled.tr`
    height: auto;
    padding-bottom: 1vh;
    background-color: burlywood;
    border-bottom: 3px solid blue;
`