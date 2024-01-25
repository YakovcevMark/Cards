import React, {ReactNode, useState} from 'react';
import {BasicModal} from "features/Modals/BasicModal/BasicModal";
import {Input} from "common/components/Inputs/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {Button} from "common/components/Button/Button";
import {Checkbox} from "common/components/Checkbox/Checkbox";
import {DriveFileRenameOutline} from "@styled-icons/material-outlined";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateAndEditPackSchema} from "utils/YupValidators/Validators";
import {ShowInputImage} from "features/Modals/common/components/ShowInputImage/ShowInputImage";

type AddAndEditPackModalFT = {
    name: string
    private?: boolean
    deckCover?: string
}
type PT = {
    id?: string
    packName?: string
    isPrivatePack?: boolean
    children?: ReactNode
    deckCover?: string
    type: "Edit" | "Create"
    submitFormHandler: (value: AddAndEditPackModalFT & { _id?: string }) => void
    shouldModalClose: boolean
    isControlDisabled: boolean
}
export const AddAndEditPackModal =
    ({
         id,
         packName,
         isPrivatePack,
         children,
         deckCover,
         submitFormHandler,
         type,
         shouldModalClose,
         isControlDisabled
     }: PT) => {
        const [cover, setCover] = useState(deckCover || "")
        const {register, handleSubmit, formState: {errors}} = useForm<AddAndEditPackModalFT>({
            defaultValues: {
                name: packName,
                private: isPrivatePack,
            },
            resolver: yupResolver(CreateAndEditPackSchema)
        })
        const onSubmit: SubmitHandler<AddAndEditPackModalFT> = (data) => {
            submitFormHandler({
                _id: id,
                deckCover: cover,
                ...data
            })
        }
        return (
            <BasicModal
                isIcon
                buttonContent={
                    type === "Edit"
                        ? <DriveFileRenameOutline/>
                        : "Create new pack"
                }
                shouldModalClose={shouldModalClose}
                title={`${type} pack`}
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
                        `${type}`
                    </Button>
                }>
                {children}
            </BasicModal>
        );
    };

