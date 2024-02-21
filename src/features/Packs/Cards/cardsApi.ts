import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {CommonFetchParams, CommonPackAndCardTypes, PaginationInfo} from "features/Packs/packsApi";

export type Card = CommonPackAndCardTypes & {
    answer: string
    answerImg: string
    question: string
    questionImg: string
    cardsPack_id: string
    comments: string
}
type FetchCardsParams = CommonFetchParams & PaginationInfo & {
    cardsPack_id: string
    cardAnswer: string
    cardQuestion: string
    sortCards: string
}
export type CardsDataResponse = PaginationInfo & {
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
export const cardsApi = createApi({
    reducerPath: "cards",
    baseQuery: fetchBaseQuery(
        {
            baseUrl: `${process.env.REACT_APP_BACK_URL}cards/`,
            credentials: "include"
        }),
    tagTypes: ['Card'],
    endpoints: build => ({
        getCards: build.query<CardsDataResponse & Response, Partial<FetchCardsParams>>({
            query: (params) => ({
                url: 'card',
                params,
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
        deleteCard: build.mutation<Response, { id: string }>({
            query: (params) => ({
                url: 'card',
                method: 'DELETE',
                params
            }),
            invalidatesTags: ['Card'],
        }),
        gradeCard: build.mutation<Response, { card_id: string, grade: 1 | 2 | 3 | 4 | 5 }>({
            query: (body) => ({
                url: 'grade',
                method: 'PUT',
                body
            }),
        })
    }),
})
export const {
    useGetCardsQuery,
    useCreateCardMutation,
    useUpdateCardMutation,
    useDeleteCardMutation,
    useGradeCardMutation,
} = cardsApi