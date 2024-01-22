import React from 'react';
import {BasicModal} from "features/Modals/BasicModal/BasicModal";
import {Input} from "common/components/Input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {Button} from "common/components/Button/Button";
import {useUpdateCardMutation} from "features/Packs/packsApi";
import {DriveFileRenameOutline} from "@styled-icons/material-outlined";

export type EditCardModel = {
    question: string
    answer: boolean
}
type PT = {
    id: string
}
export const EditCardModal = ({id}: PT) => {
    const {register, handleSubmit, formState: {errors}} = useForm<EditCardModel>({
        // resolver: yupResolver(RegisterSchema)
    })
    const [createCard, {
        isLoading: isCardCreating,
        isSuccess: isCardCreated,
        reset
    }] = useUpdateCardMutation()
    const createCardValidator = useApiErrorsHandler(createCard)
    const onSubmit: SubmitHandler<EditCardModel> = async (data) => {
        await createCardValidator({
            _id: id,
            ...data
        })
    }
    return (
        <BasicModal
            isIcon
            buttonContent={<DriveFileRenameOutline/>}
            initViewMode={isCardCreated}
            resetQuery={reset}
            title={"Edit new card"}
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
                    Edit
                </Button>
            }/>
    );
};

