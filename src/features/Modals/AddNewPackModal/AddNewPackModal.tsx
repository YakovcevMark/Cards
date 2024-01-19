import React, {useState} from 'react';
import {BasicModal} from "features/Modals/BasicModal/BasicModal";
import {Input} from "common/components/Input/Input";
import {SubmitHandler, useForm} from "react-hook-form";
import {useCreatePackMutation} from "features/Packs/packsApi";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {Button} from "common/components/Button/Button";
import {SModalControlSection} from '../ModalsStyledComponents';
import {Checkbox} from "common/components/Checkbox/Checkbox";
import {SInputsSection, STitle} from "common/components/CommonStyledComponents";

export type AddNewPackModel = {
    name: string
    private: string
}
export const AddNewPackModal = () => {
    const [viewMode, setViewMode] = useState(false)

    const {register, handleSubmit, formState: {errors}} = useForm<AddNewPackModel>({
        // resolver: yupResolver(RegisterSchema)
    })
    const [createPack, {
        isLoading: packCreating
    }] = useCreatePackMutation()
    const createPackValidator = useApiErrorsHandler(createPack)
    const onSubmit: SubmitHandler<AddNewPackModel> = async (data) => {
        await createPackValidator(data)
    }
    return (
        <BasicModal
            buttonContent={"Add new pack"}
            viewMode={viewMode}
            setViewMode={setViewMode}
            setFormSubmit={handleSubmit(onSubmit)}>
            <STitle>Add new pack</STitle>
            <SInputsSection>
                <Input
                    label={"Name pack"}
                    registerFieldName={"name"}
                    register={register}
                    error={errors.name?.message}
                    disabled={packCreating}
                />
                <Checkbox
                    register={register}
                    disabled={packCreating}
                    registrFieldName={"private"}>
                    Private pack?
                </Checkbox>
            </SInputsSection>
            <SModalControlSection>
                <Button
                    gray
                    onClick={() => setViewMode(false)}>
                    Cancel
                </Button>
                <Button
                    disabled={packCreating}>
                    Create
                </Button>
            </SModalControlSection>
        </BasicModal>
    );
};

