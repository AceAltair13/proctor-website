import axios from "axios";
import { URL } from "./Constants/urls";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
    baseURL: URL,
});

export const userRequest = axios.create({
    baseURL: URL,
    headers: { token: TOKEN },
});

export const postImagerequest = axios.create({
    baseURL: URL,
    headers: {
        token: TOKEN,
        // examId:
    },
});
