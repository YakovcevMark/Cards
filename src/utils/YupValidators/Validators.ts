import * as yup from "yup"

const email = {
    email: yup.string().email().required("Email is a required field")
}
const password = {
    password: yup.string().min(7).max(20).required("Password is a required field")
}
export const RegisterSchema = yup
    .object({
        ...email,
        ...password,
        confirmPassword: yup.string().oneOf([yup.ref("password")], "Passwords does not match").required(`Confirm your password`)
    })
    .required()
export const LoginSchema = yup
    .object({
        ...email,
        ...password,
        rememberMe: yup.boolean().default(false)
    })
    .required()
export const EmailSchema = yup
    .object({
        ...email,
    })
    .required()
export const PasswordSchema = yup
    .object({
        ...password,
    })
    .required()
export const NameSchema = yup
    .object({
        name: yup.string().min(1,"Name can't be empty").optional(),
        avatar: yup.string().optional()
    })