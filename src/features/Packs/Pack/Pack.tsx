import React, {useEffect, useMemo} from 'react';
import {Button} from "common/components/Button/Button";
import {Th} from "common/components/Th/Th";
import {Pagination} from "common/components/Pagination/Pagination";
import styled from "styled-components";
import {BackArrowBlock} from "common/components/BackArrowBlock/BackArrowBlock";
import {
    SHeaderSection,
    SNoSuchItemMessage,
    SPackPagesContainer,
    SSetting,
    SSettingsSection,
    STableSection
} from "../PacksStyledComponents";
import {SHoverModule, STitle} from "common/components/CommonStyledComponents";
import {School, Tune} from "@styled-icons/material-outlined";
import {useInitializeMutation} from "../../authPages/authApi";
import {CardNotation} from "./CardNotation/CardNotation";
import {useApiErrorsHandler, useAppSearchParams, useSearchWithDelay} from "common/hooks/hooks";
import {useLazyGetCardsQuery} from "../packsApi";
import {Preloader} from "common/components/Preloader/Preloader";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {EditPackModal} from "features/Modals/EditPackModal/EditPackModal";
import {DeletePackModal} from "features/Modals/DeletePackModal/DeletePackModal";
import {PATH} from "common/components/Routes/AppRoutes";
import {AddNewCardModal} from "features/Modals/AddNewCardModal/AddNewCardModal";


export const Pack = () => {
    const {cardsPack_id} = useParams()
    const {searchParams, useMySetSearchParams} = useAppSearchParams();
    const nav = useNavigate()

    const [, {data: userData}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })

    const [fetchCards, {
        data: packData,
        isError: haveNotSuchPack,
    }] = useLazyGetCardsQuery({
        refetchOnReconnect: true,
    })
    const fetchCardsValidator = useApiErrorsHandler(fetchCards)

    const fetchParams = useMemo(() => {
        return {
            cardQuestion: searchParams.get("cardQuestion") || "",
            sortCards: searchParams.get("sortCards") || "0grade",
            pageCount: searchParams.get("pageCount") || "10",
            page: searchParams.get("page") || "1",
        }
    }, [searchParams])

    useEffect(() => {
        fetchCardsValidator({
            cardsPack_id,
            ...fetchParams
        })
    }, [fetchCardsValidator, fetchParams, cardsPack_id]);


    const setPageSearchParam = useMySetSearchParams("page")
    const setSortCardsSearchParam = useMySetSearchParams("sortCards")
    const setCardQuestionSearchParam = useMySetSearchParams("cardQuestion")
    const setPageCountSearchParam = useMySetSearchParams("pageCount")

    const [cardQuestion, setCardQuestion] = useSearchWithDelay(fetchParams.cardQuestion, setCardQuestionSearchParam, 1500)


    let isOwner = false
    if (packData) {
        isOwner = packData.packUserId === userData!._id;
    }

    if (haveNotSuchPack) {
        return <Navigate to={PATH.packs}/>
    }
    const schoolButtonHandler = () => nav(`${PATH.learn}/${cardsPack_id}`)
    return !packData ? <Preloader/> : <SSPackPagesContainer>
        <BackArrowBlock/>
        <SHeaderSection>
            <SSTitle>
                {packData.packName}
                {isOwner && <span>
                        <Tune/>
                          <SSHoverModule>
                              <EditPackModal
                                  id={cardsPack_id!}
                                  packName={packData.packName}
                                  isPrivatePack={packData.packPrivate}>
                                  <span>Edit</span>
                              </EditPackModal>
                              <DeletePackModal
                                  id={cardsPack_id!}
                                  name={packData.packName}>
                                  <span>Delete</span>
                              </DeletePackModal>
                              <Button
                                  icon
                                  disabled={!Boolean(packData.cards.length)}
                                  onClick={schoolButtonHandler}>
                                <School/>
                                <span>Learn</span>
                            </Button>
                        </SSHoverModule>
                    </span>
                }
            </SSTitle>
            {isOwner
                ? <AddNewCardModal
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
                <StyledSearchInput
                    type={"search"}
                    placeholder={"Provide tour text"}
                    value={cardQuestion}
                    onChange={(e) => setCardQuestion(e.currentTarget.value)}
                />
            </SSetting>
        </SSettingsSection>
        {packData.cards.length
            ? <>
                <STableSection>
                    <table>
                        <thead>
                        <Th
                            filterValue={"question"}
                            onChange={setSortCardsSearchParam}
                            searchValue={fetchParams.sortCards}>
                            Question
                        </Th>
                        <Th
                            filterValue={"answer"}
                            onChange={setSortCardsSearchParam}
                            searchValue={fetchParams.sortCards}>
                            Answer
                        </Th>
                        <Th
                            filterValue={"updated"}
                            onChange={setSortCardsSearchParam}
                            searchValue={fetchParams.sortCards}>
                            Last Updated
                        </Th>
                        <Th
                            filterValue={"grade"}
                            onChange={setSortCardsSearchParam}
                            searchValue={fetchParams.sortCards}>
                            Grade
                        </Th>
                        {isOwner && <th>Actions</th>}
                        </thead>
                        <tbody>
                        {packData.cards.map(c => <CardNotation
                            key={c._id}
                            id={c._id}
                            question={c.question}
                            answer={c.answer}
                            updated={c.updated}
                            grade={c.grade}
                            isOwner={isOwner}/>)
                        }
                        </tbody>
                    </table>
                </STableSection>
                <Pagination
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
const SSPackPagesContainer = styled(SPackPagesContainer)`
    grid-template-rows: 3vh 5vh 1fr 5fr 1fr;
`
const StyledSearchInput = styled.input`
    border: 1px solid rgba(0, 0, 0, 0.2)
`
const SSTitle = styled(STitle)`
    position: relative;
    height: 5vh;

    &:hover {
        div {
            display: grid;
        }
    }

    svg {
        padding-left: 10px;
        width: 3vh;
    }
`
const SSHoverModule = styled(SHoverModule)`
    width: 100%;
    top: 3vh;
    left: 3vh;
`