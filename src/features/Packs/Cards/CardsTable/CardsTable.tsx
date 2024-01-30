import React from 'react';
import {STableSection} from "features/Packs/PacksStyledComponents";
import {Th} from "common/components/Th/Th";
import {CardNotation} from "features/Packs/Cards/CardNotation/CardNotation";
import {Card} from "features/Packs/packsApi";
import {camelize} from "utils/DataUtils/handleStringsUtils";
import {useAppSearchParams} from "common/hooks/hooks";
import {Preloader} from "common/components/Preloader/Preloader";

const headers = ["Question", "Answer", "Updated", "Grade"]
type PT = {
    isOwner: boolean
    cards?: Card[]

}
export const CardsTable =
    ({
         cards,
         isOwner
     }: PT) => {
        const {searchParams, useMySetSearchParams} = useAppSearchParams();
        const setSortCardsSearchParam = useMySetSearchParams("sortCards")
        return <STableSection>
            <table>
                <thead>
                <tr>
                    {headers.map(h =>
                        <Th
                            filterValue={camelize(h)}
                            onChange={setSortCardsSearchParam}
                            searchValue={searchParams.get("sortCards") || "0grade"}
                        >
                            {h}
                        </Th>)}
                    {isOwner && <th>Actions</th>}
                </tr>
                </thead>
                    <tbody>
                    {cards
                        ? cards.map(c => <CardNotation
                            key={c._id}
                            id={c._id}
                            question={c.question}
                            questionImg={c.questionImg}
                            answer={c.answer}
                            answerImg={c.answerImg}
                            updated={c.updated}
                            grade={c.grade}
                            isOwner={isOwner}/>)
                        : <Preloader/>
                    }
                    </tbody>
                </table>
        </STableSection>
    };
