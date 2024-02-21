import React, {useEffect, useMemo, useState} from 'react';
import {Button} from "common/components/Button/Button";
import {Pagination} from "common/components/Pagination/Pagination";
import styled from "styled-components";
import {BackArrowBlock} from "common/components/BackArrowBlock/BackArrowBlock";
import {
    SCover,
    SHeaderSection,
    SNoSuchItemMessage,
    SPackPagesContainer,
    SSetting,
    SSettingsSection
} from "../PacksStyledComponents";
import {ButtonWithIconStyles, SButtonWithIcon, SHoverModule, STitle} from "common/components/CommonStyledComponents";
import {School, Tune} from "@styled-icons/material-outlined";
import {useAppSearchParams, useAppSelector} from "common/hooks/hooks";
import {Preloader} from "common/components/Preloader/Preloader";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {EditPackModal} from "features/Modals/EditPackModal/EditPackModal";
import {DeletePackModal} from "features/Modals/DeletePackModal/DeletePackModal";
import {PATH} from "common/components/Routes/AppRoutes";
import {CreateCardModal} from "features/Modals/AddNewCardModal/CreateCardModal";
import {CardsTable} from "features/Packs/Cards/CardsTable/CardsTable";
import {SearchInput} from "common/components/Inputs/SearchInput/SearchInput";
import {selectAppData} from "app/appSlice";
import {useGetCardsQuery} from "features/Packs/Cards/cardsApi";

export default function Cards() {
    const {cardsPack_id} = useParams()
    const [isOwner, setIsOwner] = useState(false)
    const nav = useNavigate()

    const {userData} = useAppSelector(selectAppData)
    const {searchParams, useMySetSearchParams} = useAppSearchParams();
    const fetchParams = useMemo(() => {

        return {
            cardQuestion: searchParams.get("cardQuestion") || undefined,
            sortCards: searchParams.get("sortCards") || "0grade",
            pageCount: searchParams.get("pageCount") || 50,
            page: searchParams.get("page") || 1,
        }
    }, [searchParams])

    const {
        data: packData,
        isError: haveNotSuchPack,
        isFetching: isCardsFetching
    } = useGetCardsQuery({
        cardsPack_id,
        ...fetchParams,
        pageCount: +fetchParams.pageCount,
        page: +fetchParams.page,
    }, {
        refetchOnMountOrArgChange: true,
    })


    useEffect(() => {
        packData
        && userData
        && setIsOwner(packData.packUserId === userData!._id)
    }, [packData, userData]);

    const setPageSearchParam = useMySetSearchParams("page")
    const setPageCountSearchParam = useMySetSearchParams("pageCount")

    if (haveNotSuchPack) {
        return <Navigate to={PATH.packs}/>
    }
    const schoolButtonHandler = () => nav(`${PATH.learn}/${cardsPack_id}`)
    return !packData
        ? <Preloader/>
        : <SSPackPagesContainer>
            <BackArrowBlock/>
            <SHeaderSection>
                <SSTitle>
                    {packData.packName}
                    {isOwner && <span>
                        <Tune/>
                          <SSHoverModule>
                                  <SEditPackModal
                                      id={cardsPack_id!}
                                      name={packData.packName}
                                      isPrivatePack={packData.packPrivate}
                                      deckCover={packData?.packDeckCover}>
                                  <span>Edit</span>
                                  </SEditPackModal>
                                  <SDeletePackModal
                                      id={cardsPack_id!}
                                      name={packData.packName}>
                                         <span>Delete</span>
                                  </SDeletePackModal>
                              <SButtonWithIcon
                                  disabled={!Boolean(packData.cards.length)}
                                  onClick={schoolButtonHandler}>
                                <School/>
                                <span>Learn</span>
                            </SButtonWithIcon>
                        </SSHoverModule>
                    </span>
                    }
                    {packData.packDeckCover && <SSCover src={packData.packDeckCover} alt="deckCover"/>}
                </SSTitle>

                {isOwner
                    ? <CreateCardModal
                        cardsPack_id={cardsPack_id!}/>
                    : <Button
                        onClick={schoolButtonHandler}>
                        Learn to pack
                    </Button>
                }

            </SHeaderSection>
            <SSettingsSection>
                <SSetting>
                    <STitle>Search</STitle>
                    <SearchInput
                        disabled={isCardsFetching}
                        searchName={"cardQuestion"}
                        placeholder={"Provide tour text"}
                    />
                </SSetting>
            </SSettingsSection>
            {packData.cards.length
                ? <>
                    <CardsTable isOwner={isOwner} cards={packData.cards}/>
                    <Pagination
                        disabled={isCardsFetching}
                        itemsName={"Cards"}
                        currentPage={packData.page}
                        totalItemsCount={packData.cardsTotalCount}
                        pageSize={packData.pageCount}
                        pageChanged={setPageSearchParam}
                        pageSizeChanged={setPageCountSearchParam}/>
                </>
                : <SNoSuchItemMessage>
                    NoItemsWithSuchParams
                </SNoSuchItemMessage>
            }

        </SSPackPagesContainer>
};
const SEditPackModal = styled(EditPackModal)`
    ${ButtonWithIconStyles}
`
const SDeletePackModal = styled(DeletePackModal)`
    ${ButtonWithIconStyles}
`
const SSCover = styled(SCover)`
    height: 10vh;
`
const SSPackPagesContainer = styled(SPackPagesContainer)`
    grid-template-rows: 3vh 5vh 1fr auto auto;
`
const SSTitle = styled(STitle)`
    height: 5vh;
    display: grid;
    grid-template-columns: 1fr auto 1fr;

    span {
        position: relative;

        &:hover {
            div {
                display: grid;
            }
        }

        padding-right: 1vw;
    }

    svg {
        width: 3vh;
    }
`
const SSHoverModule = styled(SHoverModule)`
    top: 4vh;
    left: -8vh;
    box-shadow: none;
`
