import React, {ReactNode} from 'react';
import {BasicModal} from "features/Modals/BasicModal/BasicModal";
import {useDeletePackMutation} from "features/Packs/packsApi";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {DeleteOutline} from "@styled-icons/material-outlined";
import {Button} from "common/components/Button/Button";
import styled from "styled-components";
import {stringLengthHandler} from "utils/DataUtils/handleStringsUtils";

type PT = {
    id: string
    name: string
    children?: ReactNode
}
export const DeletePackModal =
    ({
         id,
         name,
         children

     }: PT) => {
        const [deletePack, {
            isLoading: isDeletingPack,
            isSuccess: isPackDeleted,
        }] = useDeletePackMutation()
        const deletePackValidator = useApiErrorsHandler(deletePack)
        const deletePackButtonHandler = async () => {
            await deletePackValidator({id})
        }
        return <BasicModal
            isIcon
            title={"Delete Pack"}
            buttonContent={<DeleteOutline/>}
            initViewMode={isPackDeleted}
            inputsChildrenSection={
                <SP>
                    Do you really wanna to remove <b>{stringLengthHandler(name)}</b>? <br/>
                    All Cards will be deleted.
                </SP>
            }
            controlChildrenSection={
                <Button
                    red
                    type={"submit"}
                    onClick={deletePackButtonHandler}
                    disabled={isDeletingPack}>
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