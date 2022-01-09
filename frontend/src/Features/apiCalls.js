import {
    FETCH_CURRENT_EXAM_URL,
    FETCH_EXAMS_URL,
    FETCH_PAST_EXAM_URL,
    FETCH_UPCOMING_EXAM_URL,
    LOGIN_URL,
    STUDENT_REGISTER_URL,
    SUPERVISOR_REGISTER_URL,
    UPLOAD_FACE_URL,
} from "../Constants/urls";
import {
    publicRequest,
    removeToken,
    setToken,
    userRequest,
} from "../requestMethods";
import { snackActions } from "../Utils/SnackBarUtils";
import { loginFailure, loginStart, loginSuccess, resetUser } from "./userSlice";
import {
    fetchExamsStart,
    setCurrentExams,
    setHistoryExams,
    setUpcomingExams,
    fetchExamsFailure,
    resetStudent,
} from "./studentSlice";
import { resetExam, setExam, setIsCurrentExamFetching } from "./examSlice";
import { resetDashboard } from "./dashboardSlice";
import { resetQuestionPaper } from "./questionPaperSlice";
import FormData from "form-data";

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

export const fetchStudentExams = (dispatch, time) => {
    dispatch(fetchExamsStart());
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            let choice;
            let setter;
            switch (time) {
                case "upcoming":
                    choice = FETCH_UPCOMING_EXAM_URL;
                    setter = setUpcomingExams;
                    break;
                case "history":
                    choice = FETCH_PAST_EXAM_URL;
                    setter = setHistoryExams;
                    break;
                case "current":
                    choice = FETCH_CURRENT_EXAM_URL;
                    setter = setCurrentExams;
                    break;
                default:
                    break;
            }
            const res = await userRequest.get(choice);
            dispatch(setter(res.data));
        } catch (error) {
            dispatch(fetchExamsFailure());
            console.log(error);
            snackActions.error(error.response.data);
        }
    }, 1000);
};

export const fetchSingleStudentExam = (dispatch, examId) => {
    dispatch(setIsCurrentExamFetching(true));
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            console.log(examId);
            const res = await userRequest.get(
                FETCH_EXAMS_URL + "?examId=" + examId
            );
            dispatch(setExam(res.data));
        } catch (error) {
            dispatch(setIsCurrentExamFetching(false));
            snackActions.error(error.response.data);
        }
    }, 1000);
};

export const uploadPreExamFace = async (image) => {
    const formData = new FormData();
    formData.append("image", image);
    try {
        await userRequest.post(UPLOAD_FACE_URL, formData).then(() => {
            snackActions.success("Face uploaded successfully");
        });
    } catch (error) {
        snackActions.error(error.response.data);
    }
};
