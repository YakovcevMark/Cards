import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Response} from "../authPages/authApi";

type PaginationInfo = {
    page: number
    pageCount: number
}

export type CardPack = {
    _id: string
    user_id: string
    more_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    cardsCount: number
    grade: number
    shots: number
    rating: number
    type: string
    created: string
    updated: string
    __v: number
}
export type Card = {
    answer: string
    question: string
    cardPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}
export type PacksDataResponse = PaginationInfo & {
    cardPacks: CardPack[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    token: string
    tokenDeathTime: number
}
export type CardDataResponse = PaginationInfo & {
    cards: Card[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
}
export type FetchPacksParams = PaginationInfo & {
    packName: string
    min: string
    max: string
    sortPacks: string
    user_id: string
    block: string
    pageCount: string
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
        // register: build.mutation<Response, RegisterFormData>({
        //     query: (data) => ({
        //         url: 'auth/register',
        //         method: 'POST',
        //         body: data
        //     }),
        // }),
        // login: build.mutation<Response, RegisterFormData & { rememberMe: boolean }>({
        //     query: (data) => ({
        //         url: 'auth/login',
        //         method: 'POST',
        //         body: data
        //     })
        // }),
        // logout: build.mutation<Response, void>({
        //     query: () => ({
        //         url: 'auth/me',
        //         method: 'DELETE',
        //     })
        // }),
        // recoveryPassword: build.mutation<Response, Pick<RegisterFormData, 'email'> & { from?: string, message?: string }>({
        //     query: (data) => ({
        //         url: 'auth/forgot',
        //         method: 'POST',
        //         body: {
        //             from: "",
        //             message: `<div style="background-color: lime; padding: 15px">
        //                         password recovery link
        //                         <a
        //                             href='http://localhost:3000/#/set-new-password/$token$'>
        //                         link
        //                         </a>
        //                      </div>`,
        //             ...data
        //         }
        //     })
        // }),
        // setNewPassword: build.mutation <Response, Pick<RegisterFormData, 'password'> & { resetPasswordToken: string }>({
        //     query: (data) => ({
        //         url: 'auth/set-new-password',
        //         method: 'POST',
        //         body: data
        //     })
        // }),
        // updateProfile: build.mutation <Response, { name?: string, avatar?: string | ArrayBuffer }>({
        //     query: (data) => ({
        //         url: 'auth/me',
        //         method: 'PUT',
        //         body: data
        //     })
        // }),
    }),
})
export const {
    useLazyGetPacksQuery
} = packsApi