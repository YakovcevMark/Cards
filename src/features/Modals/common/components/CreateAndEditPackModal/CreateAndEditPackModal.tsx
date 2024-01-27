import React, {useState} from 'react';
import {BasicModal, BasicModalPT} from "features/Modals/common/components/BasicModal/BasicModal";
import {Input} from "common/components/Inputs/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "common/components/Button/Button";
import {Checkbox} from "common/components/Checkbox/Checkbox";
import {DriveFileRenameOutline} from "@styled-icons/material-outlined";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateAndEditPackSchema} from "utils/YupValidators/Validators";
import {ShowImageInput} from "features/Modals/common/components/ShowInputImage/ShowImageInput";
import {EditPackModalPT} from "features/Modals/EditPackModal/EditPackModal";

type AddAndEditPackModalFT = {
    name: string
    private?: boolean
    deckCover?: string
}
type PT = Partial<EditPackModalPT> & Pick<BasicModalPT,"resetQuery" | "shouldModalClose"> &{
    type: "Edit" | "Create"
    actionHandler: (value: AddAndEditPackModalFT & { _id?: string }) => Promise<void>
    isControlDisabled: boolean
}
export const CreateAndEditPackModal =
    ({
         id,
         name,
         isPrivatePack,
         children,
         deckCover,
         actionHandler,
         type,
         shouldModalClose,
         isControlDisabled,
         resetQuery
     }: PT) => {
        const [cover, setCover] = useState(deckCover || "")
        const {
            register,
            handleSubmit,
            reset,
            formState: {errors}
        } = useForm<AddAndEditPackModalFT>({
            defaultValues: {
                name,
                private: isPrivatePack,
            },
            resolver: yupResolver(CreateAndEditPackSchema)
        })
        const onSubmit: SubmitHandler<AddAndEditPackModalFT> = async (data) => {
            await actionHandler({
                _id: id,
                deckCover: cover,
                ...data
            })
            reset()
            setCover("")
        }
        return (
            <BasicModal
                isIcon={type === "Edit"}
                buttonContent={
                    type === "Edit"
                        ? <DriveFileRenameOutline/>
                        : "Create new pack"
                }
                title={`${type} pack`}
                shouldModalClose={shouldModalClose}
                resetQuery={resetQuery}
                setFormSubmit={handleSubmit(onSubmit)}
                inputsChildrenSection={
                    <>
                        <ShowImageInput
                            image={cover}
                            imageHandler={setCover}
                            clearImageHandler={() => setCover("")}
                            buttonBody={"Change image"}
                            disabled={isControlDisabled}/>
                        <Input
                            placeholder={`Name pack`}
                            registerFieldName={"name"}
                            register={register}
                            error={errors.name?.message}
                            disabled={isControlDisabled}/>
                        <Checkbox
                            register={register}
                            disabled={isControlDisabled}
                            registrFieldName={"private"}>
                            Private pack?
                        </Checkbox>
                    </>
                }
                controlChildrenSection={
                    <Button
                        type={"submit"}
                        disabled={isControlDisabled}>
                        {`${type}`}
                    </Button>
                }>
                {children}
            </BasicModal>
        );
    };