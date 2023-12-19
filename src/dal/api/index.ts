import axios from "axios";

export type UserDataResponse = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
};
export type RegisterFormData = {
    email: string;
    password: string;
};
type Response = {
    error?: string;
};
const settings = {
    withCredentials: true
};
const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    ...settings
});
export const authApi = {
    login(data: RegisterFormData & { rememberMe: boolean; }) {
        return instance.post<Response & UserDataResponse>('auth/login', data)
            .then(resp => resp.data)
    },
    register(data: RegisterFormData) {
        return instance.post<Response>('auth/register', data)
            .then(resp => resp.data)
    },
    getMe() {
        return instance.post<Response & UserDataResponse>('auth/me')
            .then(resp => resp.data)
    },
    updateMe(data: { name?: string; avatar?: string; }) {
        return instance.put<Response>('auth/me', data)
            .then(resp => resp.data)
    },
    logout() {
        return instance.delete<Response>('auth/me')
            .then(resp => resp.data)
    },
    resetPassword(data: {email:string; from?:string; message?:string;}) {
        return instance.post<Response & { info?: string; }>('auth/forgot',data)
            .then(resp => resp.data)
    },
    setNewPassword(data: {password:string; resetPasswordToken?:string;}) {
        return instance.post<Response & { info?: string; }>('auth/set-new-password',data)
            .then(resp => resp.data)
    }
};