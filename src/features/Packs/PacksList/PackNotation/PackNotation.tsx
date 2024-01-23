import React from 'react';
import {School} from "@styled-icons/material-outlined";
import {useNavigate} from "react-router-dom";
import {handleStringLength} from "utils/DataUtils/handleStringsUtils";
import {Button} from "common/components/Button/Button";
import {PATH} from "common/components/Routes/AppRoutes";
import {SNotation, SNotationActionButtons, SNotationName} from "../../PacksStyledComponents";
import {DeletePackModal} from "features/Modals/DeletePackModal/DeletePackModal";
import {EditPackModal} from "features/Modals/EditPackModal/EditPackModal";

type PT = {
    id: string
    updated: string
    packName: string
    userName: string
    cardsCount: number
    isOwner: boolean
    isPrivate: boolean
}

export const PackNotation =
    ({
         cardsCount,
         updated,
         userName,
         packName,
         isOwner,
         isPrivate,
         id
     }: PT) => {
        const nav = useNavigate()
        const showPackButtonHandler = () => nav(`${PATH.pack}/${id}`)
        const schoolButtonHandler = () => nav(`${PATH.learn}/${id}`)
        const isNotationDisabled = cardsCount === 0 ;
        return (
            <SNotation>
                <SNotationName>
                    <b>
                        <button
                            disabled={ isNotationDisabled && !isOwner }
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
                        disabled={ isNotationDisabled }
                        onClick={schoolButtonHandler}
                        icon>
                        <School/>
                    </Button>
                    {isOwner && <>
                        <EditPackModal
                            id={id}
                            packName={packName}
                            isPrivatePack={isPrivate}/>
                        <DeletePackModal
                            id={id}
                            name={packName}/>
                    </>
                    }
                </SNotationActionButtons>
            </SNotation>
        );
    };
