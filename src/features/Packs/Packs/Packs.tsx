import React, {useEffect, useMemo} from 'react';
import {DoubleSlider} from "common/components/DoubleSlider/DoubleSlider";
import {RestartAlt} from "@styled-icons/material-outlined";
import {Pagination} from "common/components/Pagination/Pagination";
import {useLazyGetPacksQuery} from "../packsApi";
import {
    SHeaderSection,
    SNoSuchItemMessage,
    SPackPagesContainer,
    SSetting,
    SSettingsSection
} from "../PacksStyledComponents";
import {SIconButton, STitle} from "common/components/CommonStyledComponents";
import {useInitializeMutation} from "../../authPages/authApi";
import {useApiErrorsHandler, useAppSearchParams} from "common/hooks/hooks";
import {Preloader} from "common/components/Preloader/Preloader";
import {CreatePackModal} from "features/Modals/CreatePackModal/CreatePackModal";
import {Switch} from "common/components/Switch/Switch";
import {Button} from "common/components/Button/Button";
import {PacksTable} from "features/Packs/Packs/PacksTable/PacksTable";
import {SearchInput} from "common/components/Inputs/SearchInput/SearchInput";

export const Packs = () => {


    const [, {data: userData}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })

    const [fetchPacks, {
        data: packsData,
        isError: fetchPacksError,
        isFetching: isFetchingPacks,
    }] = useLazyGetPacksQuery({
        refetchOnReconnect: true,
    })

    const fetchPackValidator = useApiErrorsHandler(fetchPacks)

    const {searchParams, setSearchParams, useMySetSearchParams} = useAppSearchParams();
    const fetchParams = useMemo(() => {
        return {
            packName: searchParams.get("packName") || undefined,
            min: searchParams.get("min") || "0",
            max: searchParams.get("max") || "0",
            sortPacks: searchParams.get("sortPacks") || "0updated",
            user_id: searchParams.get("user_id") || "",
            pageCount: searchParams.get("pageCount") || "50",
            block: searchParams.get("block") || "false",
            page: searchParams.get("page") || "1",
        }
    }, [searchParams])

    useEffect(() => {
        fetchPackValidator(fetchParams)
    }, [fetchPackValidator, fetchParams]);

    const setUserIdSearchParam = useMySetSearchParams("user_id")
    const setPageSearchParam = useMySetSearchParams("page")
    const setMinSearchParam = useMySetSearchParams("min")
    const setMaxSearchParam = useMySetSearchParams("max")
    const setPageCountSearchParam = useMySetSearchParams("pageCount")

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
                <SearchInput
                    disabled={isFetchingPacks}
                    searchName={"packName"}
                    placeholder={"Provide tour text"}
                />
            </SSetting>
            <SSetting>
                <STitle>Show packs cards</STitle>
                <Switch
                    disabled={isFetchingPacks}
                    optionsNames={["My", "All"]}
                    optionsValues={[userData!._id, ""]}
                    changeHandler={setUserIdSearchParam}
                    condition={fetchParams.user_id}/>
            </SSetting>

            <SSetting>
                <STitle>Number of cards</STitle>
                <DoubleSlider
                    disabled={isFetchingPacks}
                    min={packsData!.minCardsCount}
                    max={packsData!.maxCardsCount}
                    onMouseUpMin={setMinSearchParam}
                    onMouseUpMax={setMaxSearchParam}
                />
            </SSetting>

            <SSetting>
                <STitle>Clear</STitle>
                <SIconButton
                    disabled={isFetchingPacks}
                    onClick={() => setSearchParams({})}>
                    <RestartAlt/>
                </SIconButton>
            </SSetting>
        </SSettingsSection>
        {
            packsData!.cardPacks.length
                ? <>
                    <PacksTable
                        currentUserId={userData?._id}
                        cardPacks={packsData.cardPacks}/>

                    <Pagination
                        disabled={isFetchingPacks}
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
