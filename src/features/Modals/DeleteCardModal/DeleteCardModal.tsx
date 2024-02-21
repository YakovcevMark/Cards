import React from 'react';
import {
    DeletePackAndCardModal,
    NeedsPropsToDeleteCardOrPack
} from "features/Modals/common/components/DeletePackAndCardModal/DeletePackAndCardModal";
import {useDeleteCardMutation} from "features/Packs/Cards/cardsApi";

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
