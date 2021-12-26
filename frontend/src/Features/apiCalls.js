import { LOGIN_URL } from "../Constants/urls";
import { publicRequest } from "../requestMethods";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        console.log(user);
        const res = await publicRequest.post(LOGIN_URL, user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure(error.response.data));
    }
};
