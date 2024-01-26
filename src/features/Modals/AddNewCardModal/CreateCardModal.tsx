import React from 'react';
import {useApiErrorsHandler} from "common/hooks/hooks";
import {useCreateCardMutation} from "features/Packs/packsApi";
import {CreateAndEditCardModal} from "features/Modals/common/components/CreateAndEditCardModal/CreateAndEditCardModal";


type PT = {
    cardsPack_id: string
}
export const CreateCardModal =
    ({
         cardsPack_id: id
     }: PT) => {

        const [createCard, {
            isLoading: isCardCreating,
            isSuccess: isCardCreated,
            reset
        }] = useCreateCardMutation()
        const createCardValidator = useApiErrorsHandler(createCard)

        return <CreateAndEditCardModal
            type={"Create"}
            actionHandler={createCardValidator}
            shouldModalClose={isCardCreated}
            resetQuery={reset}
            cardsPack_id={id}
            isControlDisabled={isCardCreating}
        />
    }


