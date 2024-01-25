import React from 'react';
import {School} from "@styled-icons/material-outlined";
import {useNavigate} from "react-router-dom";
import {stringLengthHandler} from "utils/DataUtils/handleStringsUtils";
import {Button} from "common/components/Button/Button";
import {PATH} from "common/components/Routes/AppRoutes";
import {SCover, SNotation, SNotationActionButtons, SNotationName} from "../../PacksStyledComponents";
import {DeletePackModal} from "features/Modals/DeletePackModal/DeletePackModal";
import {EditPackModal} from "features/Modals/EditPackModal/EditPackModal";
import styled from "styled-components";

type PT = {
    id: string
    updated: string
    packName: string
    userName: string
    cardsCount: number
    isOwner: boolean
    isPrivate: boolean
    deckCover?: string
}

export const PackNotation =
    ({
         cardsCount,
         updated,
         userName,
         packName,
         isOwner,
         isPrivate,
         deckCover,
         id
     }: PT) => {
        const nav = useNavigate()
        const showPackButtonHandler = () => nav(`${PATH.cards}/${id}`)
        const schoolButtonHandler = () => nav(`${PATH.learn}/${id}`)
        const isNotationDisabled = cardsCount === 0;
        return (
            <SNotation>
                <SNotationName>
                    <div>
                        <b>
                            <button
                                style={{backgroundImage:`${deckCover}`}}
                                disabled={isNotationDisabled && !isOwner}
                                onClick={showPackButtonHandler}>
                                {stringLengthHandler(packName)}
                            </button>
                        </b>
                        {deckCover && <SCover src={deckCover} alt="deckCover"/>}
                    </div>
                </SNotationName>
                <td>{cardsCount}</td>
                <td>{updated}</td>
                <td>{stringLengthHandler(userName)}</td>
                <SNotationActionButtons>
                    <Button
                        disabled={isNotationDisabled}
                        onClick={schoolButtonHandler}
                        icon>
                        <School/>
                    </Button>
                    {isOwner && <>
                        <EditPackModal
                            id={id}
                            name={packName}
                            isPrivatePack={isPrivate}
                            deckCover={deckCover}/>
                        <DeletePackModal
                            id={id}
                            name={packName}/>
                    </>
                    }
                </SNotationActionButtons>
            </SNotation>
        );
    };
