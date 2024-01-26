import React from 'react';
import {useCreatePackMutation} from "features/Packs/packsApi";
import {useApiErrorsHandler} from "common/hooks/hooks";
import {CreateAndEditPackModal} from "features/Modals/common/components/CreateAndEditPackModal/CreateAndEditPackModal";

export const CreatePackModal = () => {
    const [createPack, {
        isLoading: isPackCreating,
        isSuccess: isPackCreated,
        reset
    }] = useCreatePackMutation()
    const createPackValidator = useApiErrorsHandler(createPack)
    return <CreateAndEditPackModal
        type={"Create"}
        actionHandler={createPackValidator}
        shouldModalClose={isPackCreated}
        resetQuery={reset}
        isControlDisabled={isPackCreating}
    />
};
