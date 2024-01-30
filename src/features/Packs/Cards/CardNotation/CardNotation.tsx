import React from 'react';
import {stringLengthHandler} from "utils/DataUtils/handleStringsUtils";
import {SNotation, SNotationActionButtons} from "../../PacksStyledComponents";
import {EditCardModal, EditCardModalPT} from "features/Modals/EditCardModal/EditCardModal";
import {DeleteCardModal} from "features/Modals/DeleteCardModal/DeleteCardModal";
import {NotationGrade} from "features/Packs/Cards/CardNotation/NotationGrade/NotationGrade";
import styled from "styled-components";
import {IconButtonStyles} from "common/components/CommonStyledComponents";

type PT = EditCardModalPT & {
    updated: string
    grade: number
    isOwner: boolean
}

export const CardNotation =
    ({
         updated,
         question,
         questionImg,
         answer,
         answerImg,
         isOwner,
         grade,
         id
     }: PT) => {
        return (
            <SNotation>
                <td>
                    {questionImg
                        ? <SImage src={questionImg} alt={"questionImg"}/>
                        : stringLengthHandler(question)
                    }
                </td>
                <td>
                    {answerImg
                        ? <SImage src={answerImg} alt={"answerImg"}/>
                        : stringLengthHandler(answer)
                    }
                </td>
                <td>{updated}</td>
                <td><NotationGrade grade={grade}/></td>
                {isOwner && <SNotationActionButtons>
                    <SEditCardModal
                        question={question}
                        questionImg={questionImg}
                        answer={answer}
                        answerImg={answerImg}
                        id={id}/>
                    <SDeleteCardModal id={id}/>
                </SNotationActionButtons>
                }
            </SNotation>
        );
    };
const SEditCardModal = styled(EditCardModal)`
    ${IconButtonStyles}
`
const SDeleteCardModal = styled(DeleteCardModal)`
    ${IconButtonStyles}
`
const SImage = styled.img`
    height: 80px
`
