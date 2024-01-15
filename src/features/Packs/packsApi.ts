import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Response} from "../authPages/authApi";

type PaginationInfo = {
    page: number
    pageCount: number
}
type CommonPackAndCardTypes = {
    _id: string
    grade: number
    type: string
    shots: number
    rating: number
    user_id: string
    created: string
    updated: string
}
type CommonFetchParams = {
    min: string
    max: string
}

export type CardsPack = CommonPackAndCardTypes & {
    more_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    cardsCount: number
    __v: number
}
export type FetchPacksParams = CommonFetchParams & PaginationInfo & {
    packName: string
    sortPacks: string
    user_id: string
    block: string
}
export type PacksDataResponse = PaginationInfo & {
    cardPacks: CardsPack[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    token: string
    tokenDeathTime: number
}
type PackPostData = Omit<CommonPackAndCardTypes,"created"| "_id" | "updated" | "user_id"> & {
    name:string
    path:string
    deckCover:string
    private:boolean
}

export type Card = CommonPackAndCardTypes & {
    answer: string
    question: string
    cardPack_id: string
    __v: number
}
type FetchCardsParams = CommonFetchParams & PaginationInfo & {
    cardPack_id:string
    cardAnswer:string
    cardQuestion:string
    sortCards:string
}
export type CardDataResponse = PaginationInfo & {
    cards: Card[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
}

type CardPostData = Omit<CommonPackAndCardTypes,"created"| "_id" | "updated" | "user_id"> & {
    cardsPack_id:string
    question:string
    answer:string
    answerImg:string
    questionImg:string
    answerVideo:string
    questionVideo:string
}



export const packsApi = createApi({
    reducerPath: "packs",
    baseQuery: fetchBaseQuery(
        {
            // baseUrl: 'https://neko-back.herokuapp.com/2.0/cards/',
            baseUrl: 'http://localhost:7542/2.0/cards/',
            credentials: "include"
        }),
    endpoints: build => ({
        getPacks: build.query<PacksDataResponse & Response, Partial<FetchPacksParams>>({
            query: (data) => ({
                url: 'pack',
                params: {
                    ...data
                },

            }),
        }),
        createPack: build.mutation<Response, Partial<PackPostData>>({
            query: (data) => ({
                url: 'pack',
                method: 'POST',
                body: data
            }),
        }),
        updatePack: build.mutation<Response, Partial<PackPostData> & { _id: string }>({
            query: (data) => ({
                url: 'pack',
                method: 'PUT',
                body: data
            })
        }),
        deletePack: build.mutation<Response, { _id:String } >({
            query: ({_id}) => ({
                url: 'pack',
                method: 'DELETE',
                params: _id
            })
        }),
        getCards: build.query<CardDataResponse & Response, Partial<FetchCardsParams>>({
            query: (data) => ({
                url: 'card',
                params: {
                    ...data
                },

            }),
        }),
        createCard: build.mutation<Response, Partial<CardPostData>>({
            query: (data) => ({
                url: 'card',
                method: 'POST',
                body: data
            }),
        }),
        updateCard: build.mutation<Response, Partial<CardPostData> & { _id: string, comments:string }>({
            query: (data) => ({
                url: 'card',
                method: 'PUT',
                body: data
            })
        }),
        deleteCard: build.mutation<Response, { _id:String } >({
            query: ({_id}) => ({
                url: 'card',
                method: 'DELETE',
                params: _id
            })
        }),
    }),
})
export const {
    useLazyGetPacksQuery,
    useCreatePackMutation,
    useUpdatePackMutation,
    useDeletePackMutation,
    useLazyGetCardsQuery,
    useCreateCardMutation,
    useUpdateCardMutation,
    useDeleteCardMutation,
} = packsApi