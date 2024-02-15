import React from 'react';
import {useCreatePackMutation} from "features/Packs/packsApi";
import {CreateAndEditPackModal} from "features/Modals/common/components/CreateAndEditPackModal/CreateAndEditPackModal";

export const CreatePackModal = () => {
    const [createPack, {
        isLoading: isPackCreating,
        isSuccess: isPackCreated,
        reset
    }] = useCreatePackMutation()
    return <CreateAndEditPackModal
        type={"Create"}
        actionHandler={createPack}
        shouldModalClose={isPackCreated}
        resetQuery={reset}
        isControlDisabled={isPackCreating}
    />
};
