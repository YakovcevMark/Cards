import React, {useState} from 'react';
import {BasicModal} from "features/Modals/BasicModal/BasicModal";
import {Input} from "common/components/Inputs/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {useCreatePackMutation} from "features/Packs/packsApi";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {Button} from "common/components/Button/Button";
import {Checkbox} from "common/components/Checkbox/Checkbox";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateAndEditPackSchema} from "utils/YupValidators/Validators";
import {ShowInputImage} from "features/Modals/common/components/ShowInputImage/ShowInputImage";

type AddNewPackModel = {
    name: string
    private?: boolean
}

export const AddNewPackModal = () => {
    const [cover, setCover] = useState("")
    const {
        register,
        handleSubmit,
        resetField,
        formState: {errors}
    } = useForm<AddNewPackModel>({
        resolver: yupResolver(CreateAndEditPackSchema)
    })
    const [createPack, {
        isLoading: isPackCreating,
        isSuccess: isPackCreated,
        reset
    }] = useCreatePackMutation()
    const createPackValidator = useApiErrorsHandler(createPack)
    const onSubmit: SubmitHandler<AddNewPackModel> = async (data) => {
        await createPackValidator({
            deckCover: cover,
            ...data
        })
        resetField("name")
        setCover("")
    }
    return (
        <BasicModal
            buttonContent={"Add new pack"}
            shouldModalClose={isPackCreated}
            resetQuery={reset}
            title={"Add new pack"}
            setFormSubmit={handleSubmit(onSubmit)}
            inputsChildrenSection={
                <>
                    <ShowInputImage
                        cover={cover}
                        changeCoverHandler={setCover}
                        buttonBody={"Change cover"}/>
                    <Input
                        label={"Name pack"}
                        registerFieldName={"name"}
                        register={register}
                        error={errors.name?.message}
                        disabled={isPackCreating}
                    />
                    <Checkbox
                        register={register}
                        disabled={isPackCreating}
                        registrFieldName={"private"}>
                        Private pack?
                    </Checkbox>
                </>
            }
            controlChildrenSection={
                <Button
                    type={"submit"}
                    disabled={isPackCreating}>
                    Create
                </Button>
            }/>
    );
};
