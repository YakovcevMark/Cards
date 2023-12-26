import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RegisterFormData} from "./index";

type Response = {
    error?: string;
};
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:7542/2.0/',
            credentials: "include"
        }),
    endpoints: build => ({
        initialize: build.mutation({
            query: () => ({
                url: 'auth/me',
                method: 'POST'
            })
        }),
        register: build.mutation<Response, RegisterFormData>({
            query: (data) => ({
                url: 'auth/register',
                method: 'POST',
                body: data
            })
        }),
        login: build.mutation<Response, RegisterFormData & { rememberMe: boolean }>({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: data
            })
        }),
        logout: build.mutation<Response,any>({
            query: (data) => ({
                url: 'auth/me',
                method: 'DELETE',
            })
        })
    })
})

export const {
    useInitializeMutation,
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
} = apiSlice