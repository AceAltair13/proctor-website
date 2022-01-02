import * as yup from "yup";

export const registerValidation = yup.object().shape({
    emailId: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("This field is required"),
    firstName: yup
        .string()
        .required("First name is required"),
    lastName: yup
        .string()
        .required("Last name is required"),
    phoneNumber: yup
        .string()
        .required("Phone number is required"),
});