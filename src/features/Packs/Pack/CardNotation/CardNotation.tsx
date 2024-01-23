import React from 'react';
import {handleStringLength} from "utils/DataUtils/handleStringsUtils";
import {SNotation, SNotationActionButtons, SNotationName} from "../../PacksStyledComponents";
import {EditCardModal} from "features/Modals/EditCardModal/EditCardModal";
import {DeleteCardModal} from "features/Modals/DeleteCardModal/DeleteCardModal";
import {NotationGrade} from "features/Packs/Pack/CardNotation/NotationGrade/NotationGrade";

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
                <SNotationQuestion>
                    {handleStringLength(question)}
                </SNotationQuestion>
                <td>{handleStringLength(answer)}</td>
                <td>{updated}</td>
                <td><NotationGrade grade={grade}/></td>
                {isOwner && <SNotationActionButtons>
                    <EditCardModal id={id}/>
                    <DeleteCardModal id={id}/>
                </SNotationActionButtons>
                }
            </SNotation>
        );
    };
const SNotationQuestion = SNotationName