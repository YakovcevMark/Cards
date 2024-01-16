import React, {MouseEvent, useEffect, useMemo} from 'react';
import {DoubleSlider} from "../../../common/components/DoubleSlider/DoubleSlider";
import {RestartAlt} from "@styled-icons/material-outlined";
import {TableNotation} from "../../../common/components/TableNotation/TableNotation";
import {Th} from "../../../common/components/Th/Th";
import {Pagination} from "../../../common/components/Pagination/Pagination";
import styled from "styled-components";
import {secondColor} from "../../../assets/stylesheets/colors";
import {useLazyGetPacksQuery} from "../packsApi";
import {SHeaderSection, SPackPagesContainer, SSetting, SSettingsSection, STableSection} from "../PacksStyledComponents";
import {STitle} from "../../../common/components/CommonStyledComponents";
import {Button} from "../../../common/components/Button/Button";
import {useInitializeMutation} from "../../authPages/authApi";
import {useApiErrorsHandler, useAppSearchParams, useSearchWithDelay} from "../../../common/hooks/hooks";
import {Preloader} from "../../../common/components/Preloader/Preloader";

export const PacksList = () => {
    // const data = {
    //     cardPacks: [
    //         {_id: "1", name: "awd", cardsCount: 1, updated: "18.02.2002", user_id: "LolKek"},
    //         {_id: "2", name: "awd", cardsCount: 2, updated: "18.02.2002", user_id: "LolKek"},
    //         {_id: "3", name: "awd", cardsCount: 3, updated: "18.02.2002", user_id: "LolKek"},
    //         {_id: "4", name: "awd", cardsCount: 4, updated: "18.02.2002", user_id: "LolKek"},
    //         {_id: "5", name: "awd", cardsCount: 5, updated: "18.02.2002", user_id: "LolKek"},
    //         {_id: "6", name: "awd", cardsCount: 6, updated: "18.02.2002", user_id: "LolKek"},
    //         {_id: "7", name: "awd", cardsCount: 7, updated: "18.02.2002", user_id: "LolKek"},
    //         {_id: "8", name: "awd", cardsCount: 8, updated: "18.02.2002", user_id: "LolKek"},
    //         {_id: "9", name: "awd", cardsCount: 9, updated: "18.02.2002", user_id: "LolKek"},
    //         {_id: "10", name: "awd", cardsCount: 10, updated: "18.02.2002", user_id: "LolKek"},
    //     ],
    //     cardPacksTotalCount: 2300,
    //     maxCardsCount: 4,
    //     minCardsCount: 0,
    //     page: 1,
    //     pageCount: 10,
    // };

    const [, {data: userData}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })

    const {searchParams, useMySetSearchParams, setSearchParams} = useAppSearchParams();


    const [fetchPacks, {
        // data:packsData
        data,
        isLoading
    }] = useLazyGetPacksQuery({
        refetchOnFocus: true,
        refetchOnReconnect: true,
    })

    const fetchPackValidator = useApiErrorsHandler(fetchPacks)

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

    const setPackNameHandler = useSearchWithDelay(setPackNameSearchParam, 1500)

    const changeAccessory = (e: MouseEvent<HTMLButtonElement>) =>
        setUserIdSearchParam(e.currentTarget.value)

    const clearButtonHandler = () => {
        setSearchParams({})
    }

    return !data ? <Preloader/> : <SPackPagesContainer>
        <SHeaderSection>
            <STitle>Pack list</STitle>
            <Button>Add new pack</Button>
        </SHeaderSection>
        <SSettingsSection>
            <SSetting>
                <STitle>Search</STitle>
                <SSearchInput
                    type={"search"}
                    placeholder={"Provide tour text"}
                    onChange={(e) => setPackNameHandler(e.currentTarget.value)}
                />
            </SSetting>
            <SSetting>
                <STitle>Show packs cards</STitle>
                <SButtonSection>
                    <button
                        className={fetchParams.user_id ? "active" : ""}
                        onClick={changeAccessory}
                        value={userData!._id}>
                        My
                    </button>
                    <button
                        className={fetchParams.user_id ? "" : "active"}
                        onClick={changeAccessory}
                        value={""}>
                        All
                    </button>
                </SButtonSection>
            </SSetting>

            <SSetting>
                <STitle>Number of cards</STitle>
                <DoubleSlider
                    min={data!.minCardsCount}
                    max={data!.maxCardsCount}
                    // onChange={({min, max}) => console.log(`min: ${min} max: ${max}`)}
                    onMouseUpMin={setMinSearchParam}
                    onMouseUpMax={setMaxSearchParam}
                />
            </SSetting>

            <SSetting>
                <STitle>Clear</STitle>
                <button
                    onClick={clearButtonHandler}>
                    <RestartAlt/>
                </button>
            </SSetting>
        </SSettingsSection>
        <STableSection>

            <table>
                <thead>
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
                </thead>
                <tbody>
                {
                    data!.cardPacks.map(c => <TableNotation
                        key={c._id}
                        packName={c.name}
                        userName={c.user_name}
                        updated={c.updated}
                        cardsCount={c.cardsCount}
                        isOwner={userData!._id === c.user_id}/>)
                }
                </tbody>
            </table>
        </STableSection>

        <Pagination
            itemsName={"Cards"}
            currentPage={data!.page}
            totalItemsCount={data!.cardPacksTotalCount}
            pageSize={data!.pageCount}
            pageSizeChanged={setPageCountSearchParam}
            pageChanged={setPageSearchParam}/>

    </SPackPagesContainer>
};

const SSearchInput = styled.input`
    border: 1px solid rgba(0, 0, 0, 0.2)
`
const SButtonSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    button {
        font-size: 20px;
    }

    .active {
        color: white;
        background-color: ${secondColor};
    }
`

