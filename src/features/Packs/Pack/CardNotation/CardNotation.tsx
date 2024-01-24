import React from 'react';
import {stringLengthHandler} from "utils/DataUtils/handleStringsUtils";
import {SNotation, SNotationActionButtons} from "../../PacksStyledComponents";
import {EditCardModal} from "features/Modals/EditCardModal/EditCardModal";
import {DeleteCardModal} from "features/Modals/DeleteCardModal/DeleteCardModal";
import {NotationGrade} from "features/Packs/Pack/CardNotation/NotationGrade/NotationGrade";
import styled from "styled-components";

type PT = {
    id: string
    updated: string
    question: string
    answer: string
    grade: number
    isOwner: boolean
}

export const CardNotation =
    ({
         updated,
         question,
         answer,
         isOwner,
         grade,
         id
     }: PT) => {
        return (
            <SNotation>
                <STd>
                    {stringLengthHandler(question)}
                </STd>
                <STd>{stringLengthHandler(answer)}</STd>
                <td>{updated}</td>
                <td><NotationGrade grade={grade}/></td>
                {isOwner && <SNotationActionButtons>
                    <EditCardModal
                        question={question}
                        answer={answer}
                        id={id}/>
                    <DeleteCardModal id={id}/>
                </SNotationActionButtons>
                }
            </SNotation>
        );
    };
const STd = styled.td`
    width:20vw;
`