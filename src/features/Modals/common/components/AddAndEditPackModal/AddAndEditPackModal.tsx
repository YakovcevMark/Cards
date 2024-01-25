import React, {useState} from 'react';
import {BasicModal} from "features/Modals/BasicModal/BasicModal";
import {Input} from "common/components/Inputs/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "common/components/Button/Button";
import {Checkbox} from "common/components/Checkbox/Checkbox";
import {DriveFileRenameOutline} from "@styled-icons/material-outlined";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateAndEditPackSchema} from "utils/YupValidators/Validators";
import {ShowInputImage} from "features/Modals/common/components/ShowInputImage/ShowInputImage";
import {EditModalPT} from "features/Modals/EditPackModal/EditPackModal";

type AddAndEditPackModalFT = {
    name: string
    private?: boolean
    deckCover?: string
}
type PT = Partial<EditModalPT> &{
    resetQuery?: () => void
    type: "Edit" | "Create"
    actionHandler: (value: AddAndEditPackModalFT & { _id?: string }) => Promise<void>
    shouldModalClose: boolean
    isControlDisabled: boolean
}
export const AddAndEditPackModal =
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
                name: name,
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
                        <ShowInputImage
                            cover={cover}
                            changeCoverHandler={setCover}
                            buttonBody={"Change cover"}/>
                        <Input
                            label={`Name pack`}
                            registerFieldName={"name"}
                            register={register}
                            error={errors.name?.message}
                            disabled={isControlDisabled}
                        />
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

