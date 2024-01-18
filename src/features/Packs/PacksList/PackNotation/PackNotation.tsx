import React from 'react';
import {DeleteOutline, DriveFileRenameOutline, School} from "@styled-icons/material-outlined";
import {useNavigate} from "react-router-dom";
import {handleStringLength} from "utils/DataUtils/handleStringsUtils";
import {Button} from "common/components/Button/Button";
import {PackPath} from "common/components/Routes/AppRoutes";
import {SNotation, SNotationActionButtons, SNotationName} from "../../PacksStyledComponents";
import {useDeletePackMutation, useUpdatePackMutation} from "../../packsApi";
import {useApiErrorsHandler} from "common/hooks/hooks";

type PT = {
    id: string
    updated: string
    packName: string
    userName: string
    cardsCount: number
    isOwner: boolean
}

export const PackNotation =
    ({
         cardsCount,
         updated,
         userName,
         packName,
         isOwner,
         id
     }: PT) => {
        const [deletePack, {
            isLoading: deletingPack
        }] = useDeletePackMutation()
        const deletePackValidator = useApiErrorsHandler(deletePack)
        const deletePackButtonHandler = async () => await deletePackValidator({id})

        const [updatePack, {
            isLoading: updatingPack
        }] = useUpdatePackMutation()

        const updatePackValidator = useApiErrorsHandler(updatePack)
        const updatePackButtonHandler = async () => await updatePackValidator({
            _id: id,
            name: `${packName}+`
        })

        const nav = useNavigate()
        const showPackButtonHandler = () => nav(`${PackPath}/${id}`)
        const schoolButtonHandler = () => alert("Hi!")
        const isControlButtonsDisabled = deletingPack || updatingPack;
        const isNotationDisabled = cardsCount === 0;

        return (
            <SNotation>
                <SNotationName>
                    <b>
                        <button
                            disabled={isNotationDisabled}
                            onClick={showPackButtonHandler}>
                            {handleStringLength(packName)}
                        </button>
                    </b>
                </SNotationName>
                <td>{cardsCount}</td>
                <td>{updated}</td>
                <td>{handleStringLength(userName)}</td>
                <SNotationActionButtons>
                    <Button
                        disabled={isNotationDisabled}
                        onClick={schoolButtonHandler}
                        icon>
                        <School/>
                    </Button>
                    {isOwner && <>
                        <Button
                            onClick={updatePackButtonHandler}
                            disabled={isControlButtonsDisabled}
                            icon>
                            <DriveFileRenameOutline/>
                        </Button>
                        <Button
                            onClick={deletePackButtonHandler}
                            disabled={isControlButtonsDisabled}
                            icon>
                            <DeleteOutline/>
                        </Button>
                    </>
                    }
                </SNotationActionButtons>
            </SNotation>
        );
    };
