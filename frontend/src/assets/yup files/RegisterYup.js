import * as Yup from "yup"

export const signUpSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("please enter your password"),
    confirmPassword: Yup.string().required('Enter confirm password').oneOf([Yup.ref("password"), null], 'Password must match')
});

export const LoginFormSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("please enter your password")
});

export const createTeamSchema = Yup.object({
    _id: Yup.string().min(2).max(25).required("Please enter your name or id"),
    password: Yup.string().min(6).required("please enter your password"),
    confirmPassword: Yup.string().required('Enter confirm password').oneOf([Yup.ref("password"), null], 'Password must match')
});
export const joinTeamSchema = Yup.object({
    _id: Yup.string().min(2).max(25).required("Please enter your name or id"),
    password: Yup.string().min(6).required("please enter your password")
});