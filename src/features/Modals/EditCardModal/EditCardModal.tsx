import React from 'react';
import {useUpdateCardMutation} from "features/Packs/packsApi";
import {CreateAndEditCardModal} from "features/Modals/common/components/CreateAndEditCardModal/CreateAndEditCardModal";


export type EditCardModalPT = {
    id: string
    question: string
    questionImg: string
    answer: string
    answerImg: string
    className?:string
}
export const EditCardModal =
    (props: EditCardModalPT) => {
        const [createCard, {
            isLoading: isCardCreating,
            isSuccess: isCardCreated,
            reset
        }] = useUpdateCardMutation()
        return <CreateAndEditCardModal
            type={"Edit"}
            actionHandler={createCard}
            isControlDisabled={isCardCreating}
            shouldModalClose={isCardCreated}
            resetQuery={reset}
            {...props}
        />
    }