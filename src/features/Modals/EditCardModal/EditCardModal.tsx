import React from 'react';
import {BasicModal} from "features/Modals/common/components/BasicModal/BasicModal";
import {Input} from "common/components/Inputs/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {Button} from "common/components/Button/Button";
import {useUpdateCardMutation} from "features/Packs/packsApi";
import {DriveFileRenameOutline} from "@styled-icons/material-outlined";
import {CreateAndEditCardSchema} from "utils/YupValidators/Validators";
import {yupResolver} from "@hookform/resolvers/yup";

export type EditCardModalFT = {
    question?: string
    questionImg?:string
    answer?: string
    answerImg?:string
}

export type EditCardModalPT = EditCardModalFT & {
    id: string
}
export const EditCardModal =
    ({
         id,
         question,
         answer
     }: EditCardModalPT) => {

        const [createCard, {
            isLoading: isCardCreating,
            isSuccess: isCardCreated,
            reset
        }] = useUpdateCardMutation()

        const {
            register,
            handleSubmit,
            formState: {errors}
        } = useForm<EditCardModalFT>({
            resolver: yupResolver(CreateAndEditCardSchema),
            defaultValues:{
                question,
                answer
            }
        })

        const createCardValidator = useApiErrorsHandler(createCard)
        const onSubmit: SubmitHandler<EditCardModalFT> = async (data) => {
            await createCardValidator({
                _id: id,
                ...data
            })
        }
        return (
            <BasicModal
                isIcon
                buttonContent={<DriveFileRenameOutline/>}
                shouldModalClose={isCardCreated}
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

