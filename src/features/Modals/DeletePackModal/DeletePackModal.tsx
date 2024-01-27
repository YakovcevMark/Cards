import React from 'react';
import {useDeletePackMutation} from "features/Packs/packsApi";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {
    DeletePackAndCardModal,
    NeedsPropsToDeleteCardOrPack
} from "features/Modals/common/components/DeletePackAndCardModal/DeletePackAndCardModal";

type PT = NeedsPropsToDeleteCardOrPack
export const DeletePackModal =
    (props: PT) => {
        const [deletePack, {
            isLoading: isDeletingPack,
            isSuccess: isPackDeleted,
        }] = useDeletePackMutation()
        const deletePackValidator = useApiErrorsHandler(deletePack)
        return <DeletePackAndCardModal
            shouldModalClose={isPackDeleted}
            isControlDisabled={isDeletingPack}
            actionHandler={deletePackValidator}
            {...props}/>
    }