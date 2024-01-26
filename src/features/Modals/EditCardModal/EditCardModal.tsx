import React from 'react';
import {useUpdateCardMutation} from "features/Packs/packsApi";
import {CreateAndEditCardModal} from "features/Modals/common/components/CreateAndEditCardModal/CreateAndEditCardModal";
import {useApiErrorsHandler} from "common/hooks/hooks";


export type EditCardModalPT = {
    id: string
    question: string
    questionImg: string
    answer: string
    answerImg: string
}
export const EditCardModal =
    (props: EditCardModalPT) => {
        const [createCard, {
            isLoading: isCardCreating,
            isSuccess: isCardCreated,
            reset
        }] = useUpdateCardMutation()
        const createCardValidator = useApiErrorsHandler(createCard)
        return <CreateAndEditCardModal
            type={"Edit"}
            actionHandler={createCardValidator}
            isControlDisabled={isCardCreating}
            shouldModalClose={isCardCreated}
            resetQuery={reset}
            {...props}
        />
    }