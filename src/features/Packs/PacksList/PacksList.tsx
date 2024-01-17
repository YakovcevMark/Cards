import React, {MouseEvent, useEffect, useMemo} from 'react';
import {DoubleSlider} from "../../../common/components/DoubleSlider/DoubleSlider";
import {RestartAlt} from "@styled-icons/material-outlined";
import {Th} from "../../../common/components/Th/Th";
import {Pagination} from "../../../common/components/Pagination/Pagination";
import styled from "styled-components";
import {secondColor} from "../../../assets/stylesheets/colors";
import {PackPostData, useCreatePackMutation, useLazyGetPacksQuery} from "../packsApi";
import {SHeaderSection, SPackPagesContainer, SSetting, SSettingsSection, STableSection} from "../PacksStyledComponents";
import {STitle} from "../../../common/components/CommonStyledComponents";
import {Button} from "../../../common/components/Button/Button";
import {useInitializeMutation} from "../../authPages/authApi";
import {useApiErrorsHandler, useAppSearchParams, useSearchWithDelay} from "../../../common/hooks/hooks";
import {Preloader} from "../../../common/components/Preloader/Preloader";
import {PackNotation} from "./PackNotation/PackNotation";

export const PacksList = () => {


    const [, {data: userData}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })

    const {searchParams, setSearchParams, useMySetSearchParams} = useAppSearchParams();


    const [fetchPacks, {
        data:packsData,
        isLoading
    }] = useLazyGetPacksQuery({
        refetchOnFocus: true,
        refetchOnReconnect: true,
    })

    const [createPack, {
        isLoading: packCreating
    }] = useCreatePackMutation()

    const createPackValidator = useApiErrorsHandler(createPack)

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
        setSearchParams({name:"Kek"})
    }

    const createPackButtonHandler = async () =>
            await createPackValidator({})

    return !packsData ? <Preloader/> : <SPackPagesContainer>
        <SHeaderSection>
            <STitle>Pack list</STitle>
            <Button
                type={"submit"}
                disabled={packCreating}
                onClick={createPackButtonHandler}>
                Add new pack
            </Button>
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
                    min={packsData!.minCardsCount}
                    max={packsData!.maxCardsCount}
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
                    packsData!.cardPacks.map(c => <PackNotation
                        key={c._id}
                        id={c._id}
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
            currentPage={packsData!.page}
            totalItemsCount={packsData!.cardPacksTotalCount}
            pageSize={packsData!.pageCount}
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

