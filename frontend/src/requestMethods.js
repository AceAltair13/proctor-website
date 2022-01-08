import axios from "axios";
import { URL } from "./Constants/urls";

export const setToken = (token) => {
    axios.defaults.headers.common["token"] = token;
    localStorage.setItem("token", token);
};

export const getToken = () => {
    return localStorage.getItem("token");
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

const publicRequest = axios.create({
    baseURL: URL,
});

const userRequest = axios.create({
    baseURL: URL,
    headers: { token: getToken() },
});

userRequest.interceptors.request.use(
    (config) => {
        config.headers.token = getToken();
        return config;
    },
    (error) => {
        console.log(error);
    }
);

export { userRequest, publicRequest };

// export const postImageRequest = axios.create({
//     baseURL: URL,
//     headers: {
//         token: getToken(),
//         // examId:
//     },
// });
