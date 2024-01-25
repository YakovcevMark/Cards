import React, {ReactNode} from 'react';
import {useUpdatePackMutation} from "features/Packs/packsApi";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {AddAndEditPackModal} from "features/Modals/common/components/AddAndEditPackModal/AddAndEditPackModal";


export type EditModalPT = {
    id: string
    name: string
    isPrivatePack: boolean
    children?: ReactNode
    deckCover?: string
}
export const EditPackModal =
    ({
         children,
         ...rest
     }: EditModalPT) => {

        const [updatePack, {
            isLoading: isPackUpdating,
            isSuccess: isPackUpdated,
            reset
        }] = useUpdatePackMutation()
        const updatePackValidator = useApiErrorsHandler(updatePack)

        return <AddAndEditPackModal
            type={"Edit"}
            isControlDisabled={isPackUpdating}
            shouldModalClose={isPackUpdated}
            actionHandler={updatePackValidator}
            resetQuery={reset}
            {...rest}>
            {children}
        </AddAndEditPackModal>
    }

