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
import {DeleteOutline, DriveFileRenameOutline, School, Tune} from "@styled-icons/material-outlined";
import {useInitializeMutation} from "../../authPages/authApi";
import {CardNotation} from "./CardNotation/CardNotation";
import {useApiErrorsHandler, useAppSearchParams, useSearchWithDelay} from "common/hooks/hooks";
import {useCreateCardMutation, useDeletePackMutation, useLazyGetCardsQuery, useUpdatePackMutation} from "../packsApi";
import {Preloader} from "common/components/Preloader/Preloader";
import {Navigate, useParams} from "react-router-dom";
import {PacksPath} from "common/components/Routes/AppRoutes";


export const Pack = () => {
    const {cardsPack_id} = useParams()
    const [, {data: userData}] = useInitializeMutation({
        fixedCacheKey: 'shared-postMe-post',
    })
    const {searchParams, useMySetSearchParams} = useAppSearchParams();


    const [fetchCards, {
        data: packData,
        isError: haveNotSuchPack,
    }] = useLazyGetCardsQuery({
        refetchOnFocus: true,
        refetchOnReconnect: true,
    })
    const fetchCardsValidator = useApiErrorsHandler(fetchCards)

    const [createCard] = useCreateCardMutation()
    const createCardValidator = useApiErrorsHandler(createCard)


    const [deletePack, {
        isLoading: deletingPack,
        isSuccess: packHasDeleted
    }] = useDeletePackMutation()
    const deletePackValidator = useApiErrorsHandler(deletePack)
    const deletePackButtonHandler = async () => await deletePackValidator({id: cardsPack_id})

    const [updatePack, {
        isLoading: updatingPack
    }] = useUpdatePackMutation()
    const updatePackValidator = useApiErrorsHandler(updatePack)
    const updatePackButtonHandler = async () => await updatePackValidator({
        _id: cardsPack_id!,
        name: `${packData!.packName}+`
    })

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

    const createCardButtonHandler = async () =>
        await createCardValidator({cardsPack_id})

    let isOwner = false
    if (packData) {
        isOwner = packData.packUserId === userData!._id;
    }

    if (packHasDeleted || haveNotSuchPack) {
        return <Navigate to={PacksPath}/>
    }
    return !packData ? <Preloader/> : <SSPackPagesContainer>
        <BackArrowBlock/>
        <SHeaderSection>
            <SSTitle>
                {packData.packName}
                {isOwner && <span>
                        <Tune/>
                          <SSHoverModule>
                            <button
                                onClick={updatePackButtonHandler}
                                disabled={updatingPack}
                            >
                                <DriveFileRenameOutline/>
                                <span>Edit</span>
                            </button>
                            <button
                                onClick={deletePackButtonHandler}
                                disabled={deletingPack}
                            >
                                <DeleteOutline/>
                                <span>Delete</span>
                            </button>
                              <button
                                  onClick={() => alert("Hi")}
                              >
                                <School/>
                                <span>Learn</span>
                            </button>
                        </SSHoverModule>
                    </span>
                }
            </SSTitle>
            {isOwner
                ? <Button
                    onClick={createCardButtonHandler}>
                    Add new card
                </Button>
                : <Button
                    onClick={() => alert("Hi!")}>
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
                            answer={c.question}
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
    top: 3vh;
    left: 3vh;

`