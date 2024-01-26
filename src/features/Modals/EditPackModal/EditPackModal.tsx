import React, {ReactNode} from 'react';
import {useUpdatePackMutation} from "features/Packs/packsApi";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {CreateAndEditPackModal} from "features/Modals/common/components/CreateAndEditPackModal/CreateAndEditPackModal";


export type EditPackModalPT = {
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
     }: EditPackModalPT) => {

        const [updatePack, {
            isLoading: isPackUpdating,
            isSuccess: isPackUpdated,
            reset
        }] = useUpdatePackMutation()
        const updatePackValidator = useApiErrorsHandler(updatePack)

        return <CreateAndEditPackModal
            type={"Edit"}
            isControlDisabled={isPackUpdating}
            shouldModalClose={isPackUpdated}
            actionHandler={updatePackValidator}
            resetQuery={reset}
            {...rest}>
            {children}
        </CreateAndEditPackModal>
    }

