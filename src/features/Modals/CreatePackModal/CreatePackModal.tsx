import React from 'react';
import {useCreatePackMutation} from "features/Packs/packsApi";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {AddAndEditPackModal} from "features/Modals/common/components/AddAndEditPackModal/AddAndEditPackModal";

export const CreatePackModal = () => {
    const [createPack, {
        isLoading: isPackCreating,
        isSuccess: isPackCreated,
        reset
    }] = useCreatePackMutation()
    const createPackValidator = useApiErrorsHandler(createPack)
    return <AddAndEditPackModal
        type={"Create"}
        actionHandler={createPackValidator}
        shouldModalClose={isPackCreated}
        resetQuery={reset}
        isControlDisabled={isPackCreating}
    />
};
