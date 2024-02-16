import React from 'react';
import {useDeleteCardMutation} from "features/Packs/packsApi";
import {
    DeletePackAndCardModal,
    NeedsPropsToDeleteCardOrPack
} from "features/Modals/common/components/DeletePackAndCardModal/DeletePackAndCardModal";

type PT = NeedsPropsToDeleteCardOrPack
export const DeleteCardModal =
    (props: PT) => {
        const [deleteCard, {
            isLoading: isDeletingCard,
            isSuccess: isCardDeleted,
        }] = useDeleteCardMutation()
     return <DeletePackAndCardModal
         shouldModalClose={isCardDeleted}
         isControlDisabled={isDeletingCard}
         actionHandler={deleteCard}
         {...props}/>
    }
