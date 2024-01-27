import React, {ReactNode, useMemo} from 'react';
import {BasicModal} from "features/Modals/common/components/BasicModal/BasicModal";
import {DeleteOutline} from "@styled-icons/material-outlined";
import {Button} from "common/components/Button/Button";
import styled from "styled-components";
import {stringLengthHandler} from "utils/DataUtils/handleStringsUtils";

export type NeedsPropsToDeleteCardOrPack = {
    id: string
    name?: string
    children?:ReactNode
}
type PT = NeedsPropsToDeleteCardOrPack & {
    actionHandler: (value: NeedsPropsToDeleteCardOrPack) => Promise<void>
    isControlDisabled: boolean
    shouldModalClose: boolean
}
export const DeletePackAndCardModal =
    ({
         id,
         name,
         actionHandler,
         children,
         isControlDisabled,
         shouldModalClose,
     }: PT) => {
        const deletePackButtonHandler = async () => {
            await actionHandler({
                id,
                name
            })
        }
        const type = useMemo(() => name ? 'pack' : 'card', [name]);
        return <BasicModal
            isIcon
            title={`Delete ${type}`}
            buttonContent={<DeleteOutline/>}
            shouldModalClose={shouldModalClose}
            inputsChildrenSection={
                <SP>
                    Do you really wanna to remove
                    {name
                        ? <>
                            <b> {stringLengthHandler(name)} </b>
                            Pack?
                            <br/>
                            All Cards will be deleted.
                        </>
                        : <span> this card?</span>
                    }
                </SP>
            }
            controlChildrenSection={
                <Button
                    red
                    type={"submit"}
                    onClick={deletePackButtonHandler}
                    disabled={isControlDisabled}>
                    Delete
                </Button>
            }>
            {children}
        </BasicModal>
    };

const SP = styled.p`
    justify-self: start;
    font-size: 18px;
`