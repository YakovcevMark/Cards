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
type PT = Partial<EditPackModalPT> & Pick<BasicModalPT, "resetQuery" | "shouldModalClose" | "className"> & {
    type: "Edit" | "Create"
    actionHandler: any
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
         isControlDisabled,
         shouldModalClose,
         resetQuery,
         ...rest
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
                _id: id || "",
                deckCover: cover,
                ...data
            })
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
                setFormSubmit={handleSubmit(onSubmit)}
                shouldModalClose={shouldModalClose}
                resetQuery={() => {
                    resetQuery && resetQuery()
                    reset()
                    setCover("")
                }}
                inputsChildrenSection={
                    <>
                        <ShowImageInput
                            image={cover}
                            imageHandler={setCover}
                            clearImageHandler={() => setCover("")}
                            buttonBody={"cover"}
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
                            registerFieldName={"private"}>
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
                }
                {...rest}>
                {children}
            </BasicModal>
        );
    };