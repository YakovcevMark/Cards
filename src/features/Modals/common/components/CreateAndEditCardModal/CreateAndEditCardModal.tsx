import React, {useState} from 'react';
import {BasicModal, BasicModalPT} from "features/Modals/common/components/BasicModal/BasicModal";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "common/components/Button/Button";
import {
    CreateAndEditCardInputBlock
} from "features/Modals/common/components/CreateAndEditCardModal/CreateAndEditCardInputBlock/CreateAndEditCardInputBlock";
import {EditCardModalPT} from "features/Modals/EditCardModal/EditCardModal";
import {CreateAndEditCardSchema} from "utils/YupValidators/Validators";
import {yupResolver} from "@hookform/resolvers/yup";
import {DriveFileRenameOutline} from "@styled-icons/material-outlined";

type AddAndEditCardModalFT = Omit<Partial<EditCardModalPT>, "_id">
type PT = Partial<EditCardModalPT> & Pick<BasicModalPT, "resetQuery" | "shouldModalClose" | "className" | "children"> & {
    cardsPack_id?: string
    id?: string
    type: "Edit" | "Create"
    actionHandler: (value: AddAndEditCardModalFT &
        { _id?: string, cardsPack_id?: string }) => Promise<void>
    isControlDisabled: boolean
}
export const CreateAndEditCardModal =
    ({
         cardsPack_id,
         id,
         type,
         actionHandler,
         isControlDisabled,
         answer,
         questionImg,
         question,
         answerImg,
         children,
        ...rest
     }: PT) => {

        const [questionImage, setQuestionImage] = useState(questionImg || "")
        const [answerImage, setAnswerImage] = useState(answerImg || "")

        const {
            register,
            handleSubmit,
            reset,
            formState: {errors}
        } = useForm<AddAndEditCardModalFT>({
            defaultValues:{
                answer,
                question
            },
            resolver: yupResolver(CreateAndEditCardSchema)
        })

        const onSubmit: SubmitHandler<AddAndEditCardModalFT> = async (data) => {
            await actionHandler({
                cardsPack_id: cardsPack_id,
                _id: id,
                questionImg: questionImage,
                answerImg: answerImage,
                ...data
            })
            reset();
            setQuestionImage("")
            setAnswerImage("")
        }
        return (
            <BasicModal
                buttonContent={
                    type === "Edit"
                        ? <DriveFileRenameOutline/>
                        : "Create new card"
                }
                title={`${type} card`}
                setFormSubmit={handleSubmit(onSubmit)}
                inputsChildrenSection={
                    <>
                        <CreateAndEditCardInputBlock
                            name={"Question"}
                            imageHandler={setQuestionImage}
                            image={questionImage}
                            textRegister={register}
                            textError={errors.question?.message}
                            shouldInputDisabled={isControlDisabled}
                            clearImageHandler={() => setQuestionImage("")}
                        />
                        <CreateAndEditCardInputBlock
                            name={"Answer"}
                            imageHandler={setAnswerImage}
                            image={answerImage}
                            textRegister={register}
                            textError={errors.answer?.message}
                            shouldInputDisabled={isControlDisabled}
                            clearImageHandler={() => setAnswerImage("")}
                        />
                    </>
                }
                controlChildrenSection={
                    <Button
                        type={"submit"}
                        disabled={isControlDisabled}>
                        {`${type}`}
                    </Button>
                }
                {...rest}>
                {children}
            </BasicModal>
        );
    };

