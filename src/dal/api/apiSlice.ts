import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {UserDataResponse} from "./index";

type Response = {
    error?: string;
    info?: string
};
export type RegisterFormData = {
    email: string;
    password: string;
};
export const apiSlice = createApi({
    baseQuery: fetchBaseQuery(
        {
            baseUrl: 'http://localhost:7542/2.0/',
            credentials: "include"
        }),

    endpoints: build => ({
        initialize: build.mutation<UserDataResponse & Response, void>({
            query: () => ({
                url: 'auth/me',
                method: 'POST'
            }),
            // transformErrorResponse: (
            //     response: { status: string | number },
            //     meta,
            //     arg
            // ) => meta,
            // async onQueryStarted(
            //     arg,
            //     { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry}
            // ) {
            //     try {
            //         await queryFulfilled
            //     } catch (e:any) {
            //         dispatch(setAppError(e.data.error))
            //     }
            // },
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
            })
        }),
        logout: build.mutation<Response, void>({
            query: () => ({
                url: 'auth/me',
                method: 'DELETE',
            })
        }),
        recoveryPassword: build.mutation<Response, Pick<RegisterFormData, 'email'> & { from?: string, message?: string }>({
            query: (data) => ({
                url: 'auth/forgot',
                method: 'POST',
                body: {
                    from: "",
                    message: `<div style="background-color: lime; padding: 15px">
                                password recovery link
                                <a 
                                    href='http://localhost:3000/#/set-new-password/$token$'>
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
            })
        }),
    }),
})
export const {
    useInitializeMutation,
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useRecoveryPasswordMutation,
    useSetNewPasswordMutation,
    useUpdateProfileMutation,
} = apiSlice