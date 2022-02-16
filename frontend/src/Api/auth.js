import {
    LOGIN_URL,
    STUDENT_REGISTER_URL,
    SUPERVISOR_REGISTER_URL,
} from "../Constants/urls";
import { publicRequest, removeToken, setToken } from "../requestMethods";
import { snackActions } from "../Utils/SnackBarUtils";
import { loginFailure, loginStart, loginSuccess, resetUser } from "../Features/userSlice";
import { resetStudent } from "../Features/studentSlice";
import { resetExam } from "../Features/examSlice";
import { resetDashboard } from "../Features/dashboardSlice";
import { resetQuestionPaper } from "../Features/questionPaperSlice";

export const login = (dispatch, user) => {
    dispatch(loginStart());
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await publicRequest.post(LOGIN_URL, user);
            const { accessToken, ...userData } = res.data;
            setToken(accessToken);
            dispatch(loginSuccess(userData));
        } catch (error) {
            dispatch(loginFailure());
            snackActions.error(error.response.data);
        }
    }, 1000);
};

export const logout = (dispatch) => {
    removeToken();
    dispatch(resetUser());
    dispatch(resetDashboard());
    dispatch(resetStudent());
    dispatch(resetExam());
    dispatch(resetQuestionPaper());
};

export const registerUser = (dispatch, user, role) => {
    dispatch(loginStart());
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            console.log(user);
            switch (role) {
                case "student":
                    await publicRequest.post(STUDENT_REGISTER_URL, user);
                    dispatch(loginFailure());
                    snackActions.success(
                        "A verification mail has been sent to your email address for your student account"
                    );
                    break;
                case "supervisor":
                    await publicRequest.post(SUPERVISOR_REGISTER_URL, user);
                    dispatch(loginFailure());
                    snackActions.success(
                        "A verification mail has been sent to your email address for your supervisor account"
                    );
                    break;
                default:
                    break;
            }
        } catch (error) {
            dispatch(loginFailure());
            snackActions.error(error.response.data);
        }
    }, 1000);
};
