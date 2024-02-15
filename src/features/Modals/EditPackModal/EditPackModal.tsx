import React, {ReactNode} from 'react';
import {useUpdatePackMutation} from "features/Packs/packsApi";
import {CreateAndEditPackModal} from "features/Modals/common/components/CreateAndEditPackModal/CreateAndEditPackModal";


export type EditPackModalPT = {
    id: string
    name: string
    isPrivatePack: boolean
    children?: ReactNode
    deckCover?: string
    className?: string
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

        return <CreateAndEditPackModal
            type={"Edit"}
            isControlDisabled={isPackUpdating}
            shouldModalClose={isPackUpdated}
            actionHandler={updatePack}
            resetQuery={reset}
            {...rest}>
            {children}
        </CreateAndEditPackModal>
    }

