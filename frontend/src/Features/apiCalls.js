import { LOGIN_URL } from "../Constants/urls";
import { publicRequest } from "../requestMethods";
import { snackActions } from "../Utils/SnackBarUtils";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";

export const login = (dispatch, user) => {
    dispatch(loginStart());
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            console.log(user);
            const res = await publicRequest.post(LOGIN_URL, user);
            dispatch(loginSuccess(res.data));
        } catch (error) {
            dispatch(loginFailure());
            snackActions.error(error.response.data);
        }
    }, 1000);
};
