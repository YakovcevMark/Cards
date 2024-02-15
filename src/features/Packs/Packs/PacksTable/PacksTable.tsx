import React from 'react';
import {STableSection} from "features/Packs/PacksStyledComponents";
import {Th} from "common/components/Th/Th";
import {CardsPack} from "features/Packs/packsApi";
import {camelize} from "utils/DataUtils/handleStringsUtils";
import {useAppSearchParams} from "common/hooks/hooks";
import {Preloader} from "common/components/Preloader/Preloader";
import {PackNotation} from "features/Packs/Packs/PackNotation/PackNotation";

const headers = ["Name", "Cards", "Updated", "Created By"]
type PT = {
    cardPacks?: CardsPack[]
    currentUserId?: string
}
export const PacksTable =
    ({
         cardPacks,
         currentUserId
     }: PT) => {

        const {searchParams, useMySetSearchParams} = useAppSearchParams();
        const setSortPacksSearchParam = useMySetSearchParams("sortPacks")
        return <STableSection>
            <table>
                <thead>
                <tr>
                    {headers.map((h, i) =>
                        <Th
                            key={i}
                            filterValue={i === 3 ? "user_name" : camelize(h)}
                            onChange={setSortPacksSearchParam}
                            searchValue={searchParams.get("sortPacks") || "0updated"}
                        >
                            {h}
                        </Th>)}
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cardPacks
                    ? cardPacks.map(c =>
                        <PackNotation
                            key={c._id}
                            id={c._id}
                            packName={c.name}
                            userName={c.user_name}
                            updated={c.updated}
                            cardsCount={c.cardsCount}
                            isOwner={currentUserId === c.user_id}
                            isPrivate={c.private}
                            deckCover={c?.deckCover}
                        />)
                    : <Preloader/>
                }
                </tbody>
            </table>
        </STableSection>
    };
