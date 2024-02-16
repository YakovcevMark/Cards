import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export type Response = {
    error?: string;
    info?: string
};
export type RegisterFormData = {
    email: string;
    password: string;
};
export type UserDataResponse = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;


    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
};
export const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery(
        {
            baseUrl: process.env.REACT_APP_BACK_URL,
            credentials: "include"
        }),
    tagTypes: ['Me'],
    endpoints: build => ({
        initialize: build.query<UserDataResponse & Response, void>({
            query: () => ({
                url: 'auth/me',
                method: 'POST',
            }),
            providesTags: ['Me']
        }),
        register: build.mutation<Response, RegisterFormData>({
            query: (data) => ({
                url: 'auth/register',
                method: 'POST',
                body: data
            }),
        }),
        login: build.mutation<Response, RegisterFormData & { rememberMe: boolean }>({
            query: (data) => ({
                url: 'auth/login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Me']
        }),
        logout: build.mutation<Response, void>({
            query: () => ({
                url: 'auth/me',
                method: 'DELETE',
            }),
            invalidatesTags: ['Me']
        }),
        recoveryPassword: build.mutation<Response, Pick<RegisterFormData, 'email'> & {
            from?: string,
            message?: string
        }>({
            query: (data) => ({
                url: 'auth/forgot',
                method: 'POST',
                body: {
                    from: "",
                    message: `<div style="background-color: lime; padding: 15px">
                                password recovery link
                                <a 
                                  href='https://yakovcevmark.github.io/Cards/#/auth/passwordNew/$token$'>
                                link
                                </a>
                             </div>`,
                    ...data
                }
            })
        }),
        setNewPassword: build.mutation <Response, Pick<RegisterFormData, 'password'> & { resetPasswordToken: string }>({
            query: (data) => ({
                url: 'auth/set-new-password',
                method: 'POST',
                body: data
            })
        }),
        updateProfile: build.mutation <Response, { name?: string, avatar?: string | ArrayBuffer }>({
            query: (data) => ({
                url: 'auth/me',
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Me']
        }),
    }),
})
export const {
    useInitializeQuery,
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useRecoveryPasswordMutation,
    useSetNewPasswordMutation,
    useUpdateProfileMutation,
} = authApi

