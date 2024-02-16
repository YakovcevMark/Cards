import React from 'react';
import {useDeletePackMutation} from "features/Packs/packsApi";
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
        return <DeletePackAndCardModal
            shouldModalClose={isPackDeleted}
            isControlDisabled={isDeletingPack}
            actionHandler={deletePack}
            {...props}/>
    }