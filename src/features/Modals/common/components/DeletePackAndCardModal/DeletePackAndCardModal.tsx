import React, {ReactNode, useMemo} from 'react';
import {BasicModal} from "features/Modals/common/components/BasicModal/BasicModal";
import {DeleteOutline} from "@styled-icons/material-outlined";
import {Button} from "common/components/Button/Button";
import styled from "styled-components";
import {SCutString} from "features/Packs/PacksStyledComponents";

export type NeedsPropsToDeleteCardOrPack = {
    id: string
    name?: string
    children?: ReactNode
    className?: string
}
type PT = NeedsPropsToDeleteCardOrPack & {
    actionHandler: any
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
         ...rest
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
            inputsChildrenSection={
                <SP>
                    Do you really wanna to remove
                    {name
                        ? <>
                            <SSCutString>{name}</SSCutString>
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
            }
            {...rest}>
            {children}
        </BasicModal>
    };
const SSCutString = styled(SCutString)`
    max-width: 300px;
    margin:0;
    font-weight: bold;
`
const SP = styled.p`
    justify-self: start;
    font-size: 18px;
`