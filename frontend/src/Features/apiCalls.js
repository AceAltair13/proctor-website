import {
    FETCH_EXAMS_URL,
    LOGIN_URL,
    STUDENT_REGISTER_URL,
    SUPERVISOR_REGISTER_URL,
} from "../Constants/urls";
import { publicRequest, userRequest } from "../requestMethods";
import { snackActions } from "../Utils/SnackBarUtils";
import { loginFailure, loginStart, loginSuccess } from "./userSlice";
import {
    fetchExamsStart,
    fetchExamsSuccess,
    fetchExamsFailure,
} from "./studentSlice";
import { DateTime } from "luxon";

export const login = (dispatch, user) => {
    dispatch(loginStart());
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await publicRequest.post(LOGIN_URL, user);
            dispatch(loginSuccess(res.data));
        } catch (error) {
            dispatch(loginFailure());
            snackActions.error(error.response.data);
        }
    }, 1000);
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

export const fetchStudentExams = (dispatch) => {
    dispatch(fetchExamsStart());
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await userRequest.get(FETCH_EXAMS_URL);
            console.log(res.data);
            let upcoming = [];
            let current = [];
            let past = [];
            res.data.forEach((exam) => {
                let examStartTime = DateTime.fromISO(exam.examStartTime);
                let currentTime = DateTime.local();
                let examEndTime = DateTime.fromISO(exam.examEndTime);

                if (examStartTime > currentTime) {
                    upcoming.push(exam);
                } else if (examEndTime < currentTime) {
                    past.push(exam);
                } else {
                    current.push(exam);
                }
            });
            dispatch(fetchExamsSuccess({ upcoming, current, past }));
        } catch (error) {
            dispatch(fetchExamsFailure());
            snackActions.error(error.response.data);
        }
    }, 1000);
};
