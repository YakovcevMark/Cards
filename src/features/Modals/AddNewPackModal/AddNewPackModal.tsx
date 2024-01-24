import React from 'react';
import {BasicModal} from "features/Modals/BasicModal/BasicModal";
import {Input} from "common/components/Input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {useCreatePackMutation} from "features/Packs/packsApi";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {Button} from "common/components/Button/Button";
import {Checkbox} from "common/components/Checkbox/Checkbox";
import {yupResolver} from "@hookform/resolvers/yup";
import {CreateAndEditPackSchema} from "utils/YupValidators/Validators";

export type AddNewPackModel = {
    name: string
    private?: boolean
}

export const AddNewPackModal = () => {
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
            await createPackValidator(data)
            resetField("name")
        }
        return (
            <BasicModal
                buttonContent={"Add new pack"}
                initViewMode={isPackCreated}
                resetQuery = {reset}
                title={"Add new pack"}
                setFormSubmit={handleSubmit(onSubmit)}
                inputsChildrenSection={
                    <>
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

