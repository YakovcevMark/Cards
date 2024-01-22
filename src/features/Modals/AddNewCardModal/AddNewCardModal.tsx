import React from 'react';
import {BasicModal} from "features/Modals/BasicModal/BasicModal";
import {Input} from "common/components/Input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {Button} from "common/components/Button/Button";
import {useCreateCardMutation} from "features/Packs/packsApi";

export type AddNewCardModel = {
    question: string
    answer: boolean
}
type PT = {
    cardsPack_id: string
}
export const AddNewCardModal = ({cardsPack_id}: PT) => {
    const {register, handleSubmit, formState: {errors}} = useForm<AddNewCardModel>({
        // resolver: yupResolver(RegisterSchema)
    })
    const [createCard, {
        isLoading: isCardCreating,
        isSuccess: isCardCreated,
        reset
    }] = useCreateCardMutation()
    const createCardValidator = useApiErrorsHandler(createCard)
    const onSubmit: SubmitHandler<AddNewCardModel> = async (data) => {
        await createCardValidator({
            cardsPack_id,
            ...data
        })
    }
    return (
        <BasicModal
            buttonContent={"Add new card"}
            initViewMode={isCardCreated}
            resetQuery={reset}
            title={"Add new card"}
            setFormSubmit={handleSubmit(onSubmit)}
            inputsChildrenSection={
                <>
                    <Input
                        label={"Question"}
                        register={register}
                        error={errors.question?.message}
                        disabled={isCardCreating}
                    />
                    <Input
                        label={"Answer"}
                        register={register}
                        error={errors.answer?.message}
                        disabled={isCardCreating}
                    />
                </>
            }
            controlChildrenSection={
                <Button
                    type={"submit"}
                    disabled={isCardCreating}>
                    Create
                </Button>
            }/>
    );
};
