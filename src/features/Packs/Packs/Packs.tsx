import React, {useEffect, useMemo} from 'react';
import {DoubleSlider} from "common/components/DoubleSlider/DoubleSlider";
import {RestartAlt} from "@styled-icons/material-outlined";
import {Th} from "common/components/Th/Th";
import {Pagination} from "common/components/Pagination/Pagination";
import styled from "styled-components";
import {useLazyGetPacksQuery} from "../packsApi";
import {
    SHeaderSection,
    SNoSuchItemMessage,
    SPackPagesContainer,
    SSetting,
    SSettingsSection,
    STableSection
} from "../PacksStyledComponents";
import {STitle} from "common/components/CommonStyledComponents";
import {useInitializeMutation} from "../../authPages/authApi";
import {useApiErrorsHandler, useAppSearchParams, useSearchWithDelay} from "common/hooks/hooks";
import {Preloader} from "common/components/Preloader/Preloader";
import {PackNotation} from "./PackNotation/PackNotation";
import {CreatePackModal} from "features/Modals/CreatePackModal/CreatePackModal";
import {Switch} from "common/components/Switch/Switch";
import {Button} from "common/components/Button/Button";

export const Packs = () => {


    const [, {data: userData}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })

    const [fetchPacks, {
        data: packsData,
        isError: fetchPacksError
    }] = useLazyGetPacksQuery({
        refetchOnReconnect: true,
    })

    const fetchPackValidator = useApiErrorsHandler(fetchPacks)

    const {searchParams, setSearchParams, useMySetSearchParams} = useAppSearchParams();

    const fetchParams = useMemo(() => {
        return {
            packName: searchParams.get("packName") || "",
            min: searchParams.get("min") || "0",
            max: searchParams.get("max") || "0",
            sortPacks: searchParams.get("sortPacks") || "0updated",
            user_id: searchParams.get("user_id") || "",
            pageCount: searchParams.get("pageCount") || "10",
            block: searchParams.get("block") || "false",
            page: searchParams.get("page") || "1",
        }
    }, [searchParams])

    useEffect(() => {
        fetchPackValidator(fetchParams)
    }, [fetchPackValidator, fetchParams]);

    const setUserIdSearchParam = useMySetSearchParams("user_id")
    const setPageSearchParam = useMySetSearchParams("page")
    const setSortPacksSearchParam = useMySetSearchParams("sortPacks")
    const setPackNameSearchParam = useMySetSearchParams("packName")
    const setMinSearchParam = useMySetSearchParams("min")
    const setMaxSearchParam = useMySetSearchParams("max")
    const setPageCountSearchParam = useMySetSearchParams("pageCount")

    const [packName, setPackName] = useSearchWithDelay(fetchParams.packName, setPackNameSearchParam, 1500)

    if (fetchPacksError || !packsData) {
        return <Preloader/>
    }

    return <SPackPagesContainer>
        <SHeaderSection>
            <STitle>Pack list</STitle>
            <CreatePackModal/>
        </SHeaderSection>
        <SSettingsSection>
            <SSetting>
                <STitle>Search</STitle>
                <SSearchInput
                    type={"search"}
                    placeholder={"Provide tour text"}
                    value={packName}
                    onChange={(e) => setPackName(e.currentTarget.value)}
                />
            </SSetting>
            <SSetting>
                <STitle>Show packs cards</STitle>
                <Switch
                    optionsNames={["My", "All"]}
                    optionsValues={[userData!._id, ""]}
                    changeHandler={setUserIdSearchParam}
                    condition={fetchParams.user_id}/>
            </SSetting>

            <SSetting>
                <STitle>Number of cards</STitle>
                <DoubleSlider
                    min={packsData!.minCardsCount}
                    max={packsData!.maxCardsCount}
                    // imageHandler={({min, max}) => console.log(`min: ${min} max: ${max}`)}
                    onMouseUpMin={setMinSearchParam}
                    onMouseUpMax={setMaxSearchParam}
                />
            </SSetting>

            <SSetting>
                <STitle>Clear</STitle>
                <SButton
                    icon
                    onClick={() => setSearchParams({})}>
                    <RestartAlt/>
                </SButton>
            </SSetting>
        </SSettingsSection>
        {
            packsData!.cardPacks.length
                ? <>
                    <STableSection>
                        <table>
                            <thead>
                            <tr>
                                <Th
                                    filterValue={"name"}
                                    onChange={setSortPacksSearchParam}
                                    searchValue={fetchParams.sortPacks}>
                                    Name
                                </Th>
                                <Th
                                    filterValue={"cardsCount"}
                                    onChange={setSortPacksSearchParam}
                                    searchValue={fetchParams.sortPacks}>
                                    Cards
                                </Th>
                                <Th
                                    filterValue={"updated"}
                                    onChange={setSortPacksSearchParam}
                                    searchValue={fetchParams.sortPacks}>
                                    Last Updated
                                </Th>
                                <Th
                                    filterValue={"user_name"}
                                    onChange={setSortPacksSearchParam}
                                    searchValue={fetchParams.sortPacks}>
                                    Created By
                                </Th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                packsData!.cardPacks.map(c =>
                                    <PackNotation
                                        key={c._id}
                                        id={c._id}
                                        packName={c.name}
                                        userName={c.user_name}
                                        updated={c.updated}
                                        cardsCount={c.cardsCount}
                                        isOwner={userData!._id === c.user_id}
                                        isPrivate={c.private}
                                        deckCover={c?.deckCover}
                                    />)
                            }
                            </tbody>
                        </table>
                    </STableSection>

                    <Pagination
                        itemsName={"Cards"}
                        currentPage={packsData!.page}
                        totalItemsCount={packsData!.cardPacksTotalCount}
                        pageSize={packsData!.pageCount}
                        pageSizeChanged={setPageCountSearchParam}
                        pageChanged={setPageSearchParam}/>
                </>
                : <SNoSuchItemMessage>
                    NoItemsWithSuchParams
                </SNoSuchItemMessage>
        }

    </SPackPagesContainer>
};

const SButton = styled(Button)`
    width: 100%;
    height: 100%;
`
const SSearchInput = styled.input`
    border: 1px solid rgba(0, 0, 0, 0.2)
`