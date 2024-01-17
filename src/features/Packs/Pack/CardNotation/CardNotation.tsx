import React from 'react';
import {DeleteOutline, DriveFileRenameOutline} from "@styled-icons/material-outlined";
import {handleStringLength} from "../../../../utils/DataUtils/handleStringsUtils";
import {Button} from "../../../../common/components/Button/Button";
import {SNotation, SNotationActionButtons, SNotationName} from "../../PacksStyledComponents";
import {useDeleteCardMutation, useUpdateCardMutation} from "../../packsApi";
import {useApiErrorsHandler} from "../../../../common/hooks/hooks";
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
        const [deleteCard, {
            isLoading: deletingCard
        }] = useDeleteCardMutation()
        const deleteCardValidator = useApiErrorsHandler(deleteCard)
        const deleteCardButtonHandler = async () => await deleteCardValidator({id})

        const [updateCard, {
            isLoading: updatingCard
        }] = useUpdateCardMutation()
        const updateCardValidator = useApiErrorsHandler(updateCard)
        const updateCardButtonHandler = async () => await updateCardValidator({
            _id: id,
            question: `${question}+`
        })

        const isControlButtonsDisabled = deletingCard || updatingCard;
        return (
            <SNotation>
                <SNotationQuestion>
                    {handleStringLength(question)}
                </SNotationQuestion>
                <td>{handleStringLength(answer)}</td>
                <td>{updated}</td>
                <td>{grade}</td>
                {isOwner && <SNotationActionButtons>
                    <Button
                        onClick={updateCardButtonHandler}
                        disabled={isControlButtonsDisabled}
                        icon>
                        <DriveFileRenameOutline/>
                    </Button>
                    <Button
                        onClick={deleteCardButtonHandler}
                        disabled={isControlButtonsDisabled}
                        icon>
                        <DeleteOutline/>
                    </Button>
                </SNotationActionButtons>
                }
            </SNotation>
        );
    };

const SNotationQuestion = SNotationName