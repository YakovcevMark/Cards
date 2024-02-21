import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Response} from "../authPages/authApi";
import {cardsApi} from "features/Packs/Cards/cardsApi";

export type PaginationInfo = {
    page: number
    pageCount: number
}
export type CommonPackAndCardTypes = {
    _id: string
    grade: number
    type: string
    shots: number
    rating: number
    user_id: string
    created: Date
    updated: Date
    more_id: string
    __v: number

}
export type CommonFetchParams = {
    min: string
    max: string
}

export type CardsPack = CommonPackAndCardTypes & {
    user_name: string
    private: boolean
    name: string
    path: string
    cardsCount: number
    deckCover: string
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
    name: string
    path: string
    deckCover: string
    private: boolean
}

export const packsApi = createApi({
    reducerPath: "packs",
    baseQuery: fetchBaseQuery(
        {
            baseUrl: `${process.env.REACT_APP_BACK_URL}cards/`,
            credentials: "include"
        }),
    tagTypes: ['Pack'],
    endpoints: build => ({
        getPacks: build.query<PacksDataResponse & Response, Partial<FetchPacksParams>>({
            query: (params) => ({
                url: 'pack',
                params,
            }),
            providesTags: ['Pack']
        }),
        createPack: build.mutation<Response, Partial<PackPostData>>({
            query: (data) => ({
                url: 'pack',
                method: 'POST',
                body: {
                    cardsPack: {
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
            invalidatesTags: ['Pack'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(cardsApi.util.invalidateTags(["Card"]));
            },
        }),
        deletePack: build.mutation<Response, { id: String }>({
            query: (params) => ({
                url: 'pack',
                method: 'DELETE',
                params
            }),
            invalidatesTags: ['Pack'],
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                await queryFulfilled;
                dispatch(cardsApi.util.invalidateTags(["Card"]));
            },
        }),
    }),
})
export const {
    useGetPacksQuery,
    useCreatePackMutation,
    useUpdatePackMutation,
    useDeletePackMutation,
} = packsApi