import React, {MouseEvent, useEffect} from 'react';
import {DoubleSlider} from "../../../common/components/DoubleSlider/DoubleSlider";
import {RestartAlt} from "@styled-icons/material-outlined";
import {useSearchParams} from "react-router-dom";
import {TableNotation} from "../../../common/components/TableNotation/TableNotation";
import {Th} from "../../../common/components/Th/Th";
import {Pagination} from "../../../common/components/Pagination/Pagination";
import styled from "styled-components";
import {Search} from "@styled-icons/material";
import {secondColor} from "../../../assets/stylesheets/colors";
import {useLazyGetPacksQuery} from "../packsApi";
import {SHeaderSection, SPackPagesContainer, SSetting, SSettingsSection, STableSection} from "../PacksStyledComponents";
import {STitle} from "../../../common/components/CommonStyledComponents";
import {Button} from "../../../common/components/Button/Button";
import {useInitializeMutation} from "../../authPages/authApi";
import {useApiErrorsHandler} from "../../../common/hooks/hooks";
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

    const [searchParams, setSearchParams] = useSearchParams();

    const [fetchPacks, {
        // data:packsData
        data,
        isLoading
    }] = useLazyGetPacksQuery({
        refetchOnFocus: true,
        refetchOnReconnect: true,
    })
    const fetchPackValidator = useApiErrorsHandler(fetchPacks)
    // fetchPackValidator({})
    useEffect(() => {
        fetchPackValidator({
            packName: searchParams.get("packName") || "",
            min: searchParams.get("min") || "0",
            max: searchParams.get("max") || "0",
            sortPacks: searchParams.get("sortPacks") || "",
            user_id: searchParams.get("user_id") || "",
            pageCount: searchParams.get("pageCount") || "10",
            block: searchParams.get("block") || "false",
        })
    }, [fetchPackValidator, searchParams]);


    // console.log(packsData)


    const changeAccessory = (e: MouseEvent<HTMLButtonElement>) =>
        setSearchParams({user_id: e.currentTarget.value})

    const accessory = searchParams.get("user_id") || "";

    return isLoading ? <Preloader/> : <SPackPagesContainer>
        <SHeaderSection>
            <STitle>Pack list</STitle>
            <Button>Add new pack</Button>
        </SHeaderSection>
        <SSettingsSection>
            <SSetting>
                <STitle>Search</STitle>
                {/*<label>*/}
                {/*    <StyledSearch/>*/}
                {/*    <SearchInput*/}
                {/*        name={"search"}*/}
                {/*        type={"text"}*/}
                {/*        placeholder={"Provide tour text"}*/}
                {/*    />*/}
                {/*</label>*/}
                <StyledSearchInput
                    type={"search"}
                    placeholder={"Provide tour text"}
                />
            </SSetting>
            <SSetting>
                <STitle>Show packs cards</STitle>
                <SButtonSection>
                    <button
                        className={accessory ? "active" : ""}
                        onClick={changeAccessory}
                        value={userData!._id}>
                        My
                    </button>
                    <button
                        className={accessory ? "" : "active"}
                        onClick={changeAccessory}
                        value={""}>
                        All
                    </button>
                </SButtonSection>
            </SSetting>

            <SSetting>
                <STitle>Number of cards</STitle>
                {data &&
                    <DoubleSlider
                        min={data!.minCardsCount}
                        max={data!.maxCardsCount}
                        onChange={({min, max}) => console.log(`min: ${min} max: ${max}`)}
                    />
                }
            </SSetting>

            <SSetting>
                <STitle>Clear</STitle>
                <button>
                    <RestartAlt/>
                </button>
            </SSetting>
        </SSettingsSection>
        <STableSection>

            <table>
                    <Th value={"Name"}/>
                    <Th value={"Cards"}/>
                    <Th value={"Last Updated"}/>
                    <Th value={"Created by"}/>
                    <th>Actions</th>

                {data &&

                    data!.cardPacks.map(c => <TableNotation
                        key={c._id}
                        packName={c.name}
                        userName={c.user_name}
                        updated={c.updated}
                        cardsCount={c.cardsCount}
                        isOwner={userData!._id === c.user_id}
                    />)

                }
            </table>
        </STableSection>
        {data &&
            <Pagination
                itemsName={"Cards"}
                currentPage={data!.page}
                totalItemsCount={data!.cardPacksTotalCount}
                pageSize={data!.pageCount}
                pageChanged={(awd) => {
                }}/>
        }
    </SPackPagesContainer>
};


const SearchInput = styled.input`
    width: 100%;
    height: 80%;
    //padding: 0 0 0 3vh;
`
const StyledSearch = styled(Search)`
    fill: rgba(0, 0, 0, 0.4);
    position: absolute;
    top: 2px;
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
const StyledSearchInput = styled.input`
    border: 1px solid rgba(0, 0, 0, 0.2)
`

