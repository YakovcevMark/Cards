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
    more_id: string
    __v: number

}
type CommonFetchParams = {
    min: string
    max: string
}

export type CardsPack = CommonPackAndCardTypes & {
    user_name: string
    private: boolean
    name: string
    path: string
    cardsCount: number
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
export type PackPostData = Omit<CommonPackAndCardTypes, "created" | "_id" | "updated" | "user_id"> & {
    packName: string
    path: string
    deckCover: string
    private: boolean
}

export type Card = CommonPackAndCardTypes & {
    answer: string
    question: string
    cardPack_id: string
    questionImg: string
    comments: string
}
type FetchCardsParams = CommonFetchParams & PaginationInfo & {
    cardPack_id: string
    cardAnswer: string
    cardQuestion: string
    sortCards: string
}
export type CardDataResponse = PaginationInfo & {
    cards: Card[]
    packUserId: string
    packName: string
    packPrivate: boolean
    packDeckCover: string
    packCreated: string
    packUpdated: string
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    token: string
    tokenDeathTime: number

}
type CardPostData = Omit<CommonPackAndCardTypes,
    "created" | "_id" | "updated" | "user_id" | "more_id" | "__v"> & {
    cardsPack_id: string
    question: string
    answer: string
    answerImg: string
    questionImg: string
    answerVideo: string
    questionVideo: string
}


export const packsApi = createApi({
    reducerPath: "packs",
    baseQuery: fetchBaseQuery(
        {
            // baseUrl: 'https://neko-back.herokuapp.com/2.0/cards/',
            baseUrl: 'http://localhost:7542/2.0/cards/',
            credentials: "include"
        }),
    tagTypes: ['Pack', 'Card'],
    endpoints: build => ({
        getPacks: build.query<PacksDataResponse & Response, Partial<FetchPacksParams>>({
            query: (data) => ({
                url: 'pack',
                params: {
                    ...data
                },
            }),
            providesTags: ['Pack']
        }),
        createPack: build.mutation<Response, Partial<PackPostData>>({
            query: (data) => ({
                url: 'pack',
                method: 'POST',
                body: {
                    cardsPack: {
                        deckCover: "",
                        name: "Pack Subname",
                        private: false,
                        ...data
                    }
                }
            }),
            invalidatesTags: ['Pack'],
        }),
        updatePack: build.mutation<Response, Partial<PackPostData> & { _id: string }>({
            query: (data) => ({
                url: 'pack',
                method: 'PUT',
                body: {
                    cardsPack: data
                }
            }),
            invalidatesTags: ['Pack', 'Card'],
        }),
        deletePack: build.mutation<Response, { id: String }>({
            query: (data) => ({
                url: 'pack',
                method: 'DELETE',
                params: {
                    ...data
                }
            }),
            invalidatesTags: ['Pack', 'Card'],
        }),
        getCards: build.query<CardDataResponse & Response, Partial<FetchCardsParams>>({
            query: (data) => ({
                url: 'card',
                params: {
                    ...data
                },

            }),
            providesTags: ['Card']
        }),
        createCard: build.mutation<Response, Partial<CardPostData>>({
            query: (data) => ({
                url: 'card',
                method: 'POST',
                body: {
                    card: {
                        ...data
                    }
                }
            }),
            invalidatesTags: ['Card'],
        }),
        updateCard: build.mutation<Response, Partial<CardPostData> & { _id: string, comments: string }>({
            query: (data) => ({
                url: 'card',
                method: 'PUT',
                body: {
                    card: {
                        ...data
                    }
                }
            }),
            invalidatesTags: ['Card'],
        }),
        deleteCard: build.mutation<Response, { id: String }>({
            query: (data) => ({
                url: 'card',
                method: 'DELETE',
                params: data
            }),
            invalidatesTags: ['Card'],
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