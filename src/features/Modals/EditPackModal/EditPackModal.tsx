import React, {ReactNode, useState} from 'react';
import {BasicModal} from "features/Modals/BasicModal/BasicModal";
import {Input} from "common/components/Inputs/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {useUpdatePackMutation} from "features/Packs/packsApi";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {Button} from "common/components/Button/Button";
import {Checkbox} from "common/components/Checkbox/Checkbox";
import {DriveFileRenameOutline} from "@styled-icons/material-outlined";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateAndEditPackSchema} from "utils/YupValidators/Validators";
import {ShowInputImage} from "features/Modals/common/components/ShowInputImage/ShowInputImage";

export type AddNewPackModel = {
    name: string
    private?: boolean
}
type PT = {
    id: string
    packName: string
    isPrivatePack: boolean
    children?: ReactNode
    deckCover?: string
}
export const EditPackModal =
    ({
         id,
         packName,
         isPrivatePack,
         children,
         deckCover
     }: PT) => {
        const [cover, setCover] = useState(deckCover || "")
        const {register, handleSubmit, formState: {errors}} = useForm<AddNewPackModel>({
            defaultValues: {
                name: packName,
                private: isPrivatePack,
            },
            resolver: yupResolver(CreateAndEditPackSchema)
        })
        const [updatePack, {
            isLoading: isPackUpdating,
            isSuccess: isPackUpdated
        }] = useUpdatePackMutation()
        const updatePackValidator = useApiErrorsHandler(updatePack)
        const onSubmit: SubmitHandler<AddNewPackModel> = async (data) => {
            await updatePackValidator({
                _id: id,
                deckCover: cover,
                ...data
            })
        }
        return (
            <BasicModal
                isIcon
                buttonContent={<DriveFileRenameOutline/>}
                shouldModalClose={isPackUpdated}
                title={"Edit cards"}
                setFormSubmit={handleSubmit(onSubmit)}
                inputsChildrenSection={
                    <>
                        <ShowInputImage
                            cover={cover}
                            changeCoverHandler={setCover}
                            buttonBody={"Change cover"}/>
                        <Input
                            label={"Name cards"}
                            registerFieldName={"name"}
                            register={register}
                            error={errors.name?.message}
                            disabled={isPackUpdating}
                        />
                        <Checkbox
                            register={register}
                            disabled={isPackUpdating}
                            registrFieldName={"private"}>
                            Private pack?
                        </Checkbox>
                    </>
                }
                controlChildrenSection={
                    <Button
                        type={"submit"}
                        disabled={isPackUpdating}>
                        Edit
                    </Button>
                }>
                {children}
            </BasicModal>
        );
    };

