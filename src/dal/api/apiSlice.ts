import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    baseQuery: fetchBaseQuery(
        {
            baseUrl: '',
            credentials: "include"
        }),
    endpoints: build => ({
        login: build.query({
            query: () => ''
        })
    })
})
export const { useLoginQuery } = apiSlice