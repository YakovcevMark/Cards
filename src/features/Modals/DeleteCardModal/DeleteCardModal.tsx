import React, {ReactNode} from 'react';
import {BasicModal} from "features/Modals/BasicModal/BasicModal";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {DeleteOutline} from "@styled-icons/material-outlined";
import {Button} from "common/components/Button/Button";
import styled from "styled-components";
import {useDeleteCardMutation} from "features/Packs/packsApi";

type PT = {
    id: string
    children?: ReactNode
}
export const DeleteCardModal =
    ({
         id,
         children

     }: PT) => {
        const [deleteCard, {
            isLoading: isDeletingCard,
            isSuccess: isCardDeleted,
        }] = useDeleteCardMutation()
        const deleteCardValidator = useApiErrorsHandler(deleteCard)
        const deleteCardButtonHandler = async () => {
            await deleteCardValidator({id})
        }
        return <BasicModal
            isIcon
            title={"Delete Card"}
            buttonContent={<DeleteOutline/>}
            initViewMode={isCardDeleted}
            inputsChildrenSection={
                <SP>
                    Do you really wanna to remove this card?
                </SP>
            }
            controlChildrenSection={
                <Button
                    red
                    type={"submit"}
                    onClick={deleteCardButtonHandler}
                    disabled={isDeletingCard}>
                    Delete
                </Button>
            }>
            {children}
        </BasicModal>
    };
const SP = styled.p`
    justify-self: start;
    font-size: 22px;
`