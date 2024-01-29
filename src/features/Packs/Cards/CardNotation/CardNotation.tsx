import React from 'react';
import {stringLengthHandler} from "utils/DataUtils/handleStringsUtils";
import {SNotation, SNotationActionButtons} from "../../PacksStyledComponents";
import {EditCardModal, EditCardModalPT} from "features/Modals/EditCardModal/EditCardModal";
import {DeleteCardModal} from "features/Modals/DeleteCardModal/DeleteCardModal";
import {NotationGrade} from "features/Packs/Cards/CardNotation/NotationGrade/NotationGrade";
import styled from "styled-components";

type PT = EditCardModalPT &{
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
                <STd>
                    {questionImg
                        ? <SImage src={questionImg} alt={"questionImg"}/>
                        : stringLengthHandler(question)
                    }
                </STd>
                <STd>
                    {answerImg
                        ? <SImage src={answerImg} alt={"answerImg"}/>
                        : stringLengthHandler(answer)
                    }
                </STd>
                <td>{updated}</td>
                <td><NotationGrade grade={grade}/></td>
                {isOwner && <SNotationActionButtons>
                    <EditCardModal
                        question={question}
                        questionImg={questionImg}
                        answer={answer}
                        answerImg={answerImg}
                        id={id}/>
                    <DeleteCardModal id={id}/>
                </SNotationActionButtons>
                }
            </SNotation>
        );
    };
const SImage = styled.img`
    height:70px
`
const STd = styled.td`
    width: 20vw;
`