import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:7542/2.0/',
            credentials: "include"
        }),
    endpoints: build => ({
        Initialize: build.mutation({
            query: () => ({
                url:'auth/me',
                method:'POST'
            })
        })
    })
})
export const { useInitializeMutation } = apiSlice