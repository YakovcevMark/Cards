import React, {useState} from 'react';
import {BasicModal} from "features/Modals/common/components/BasicModal/BasicModal";
import {SubmitHandler, useForm} from "react-hook-form";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {Button} from "common/components/Button/Button";
import {useCreateCardMutation} from "features/Packs/packsApi";
import {
    CreateAndEditCardInputBlock
} from "features/Modals/common/components/CreateAndEditCardModal/CreateAndEditCardInputBlock/CreateAndEditCardInputBlock";

export type AddNewCardModel = {
    question: string
    answer: string
}
type PT = {
    cardsPack_id: string
}
export const AddNewCardModal =
    ({
         cardsPack_id
     }: PT) => {

        const [questionImage, setQuestionImage] = useState("")
        const [answerImage, setAnswerImage] = useState("")

        const {
            register,
            handleSubmit,
            reset: resetFormData,
            formState: {errors}
        } = useForm<AddNewCardModel>({
            // resolver: yupResolver(CreateAndEditCardSchema)
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
                questionImg: questionImage,
                answerImg: answerImage,
                ...data
            })
            resetFormData();
            setQuestionImage("")
            setAnswerImage("")
        }
        return (
            <BasicModal
                buttonContent={"Add new card"}
                shouldModalClose={isCardCreated}
                resetQuery={reset}
                title={"Add new card"}
                setFormSubmit={handleSubmit(onSubmit)}
                inputsChildrenSection={
                    <>
                        <CreateAndEditCardInputBlock
                            name={"Question"}
                            imageHandler={setQuestionImage}
                            image={questionImage}
                            textRegister={register}
                            textError={errors.question?.message}
                            shouldInputDisabled={isCardCreating}
                            clearImageHandler={() => setQuestionImage("")}
                        />
                        <CreateAndEditCardInputBlock
                            name={"Answer"}
                            imageHandler={setAnswerImage}
                            image={answerImage}
                            textRegister={register}
                            textError={errors.answer?.message}
                            shouldInputDisabled={isCardCreating}
                            clearImageHandler={() => setAnswerImage("")}
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

