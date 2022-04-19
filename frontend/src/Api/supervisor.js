import {
    FETCH_EXAMS_URL,
    FETCH_QUESTION_PAPER,
    FETCH_STUDENTS_OF_EXAM,
} from "../Constants/urls";
import { setDashboardFetching } from "../Features/dashboardSlice";
import {
    setEnrolledStudents,
    setSelectedExam,
    setSelectedQuestionPaper,
    setSupervisorExams,
} from "../Features/supervisorSlice";
import { userRequest } from "../requestMethods";
import { snackActions } from "../Utils/SnackBarUtils";

export const createExam = (dispatch, history, examDetails) => {
    dispatch(setDashboardFetching(true));
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await userRequest.post(FETCH_EXAMS_URL, examDetails);
            snackActions.success(res.data);
            history.push("/dashboard/exam/my-exams");
        } catch (error) {
            snackActions.error(error.response.data);
        } finally {
            dispatch(setDashboardFetching(false));
        }
    }, 1000);
};

export const updateExam = (dispatch, history, examDetails) => {
    dispatch(setDashboardFetching(true));
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await userRequest.put(FETCH_EXAMS_URL, examDetails);
            snackActions.success(res.data);
            history.push("/dashboard/exam/my-exams/" + examDetails.examId);
        } catch (error) {
            snackActions.error(error.response.data);
        } finally {
            dispatch(setDashboardFetching(false));
        }
    }, 1000);
};

export const deleteExam = (dispatch, history, examId) => {
    dispatch(setDashboardFetching(true));
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await userRequest.delete(FETCH_EXAMS_URL, {
                data: { examId },
            });
            snackActions.success(res.data);
            history.push("/dashboard/exam/my-exams");
        } catch (error) {
            snackActions.error(error.response.data);
        } finally {
            dispatch(setDashboardFetching(false));
        }
    }, 1000);
};

export const getSupervisorExams = (dispatch) => {
    dispatch(setDashboardFetching(true));
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await userRequest.get(FETCH_EXAMS_URL);
            dispatch(setSupervisorExams(res.data));
        } catch (error) {
            snackActions.error(error.response.data);
        } finally {
            dispatch(setDashboardFetching(false));
        }
    }, 1000);
};

export const getExamDetailsForSupervisor = (dispatch, examId) => {
    dispatch(setDashboardFetching(true));
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await userRequest.get(
                `${FETCH_EXAMS_URL}?examId=${examId}`
            );
            dispatch(setSelectedExam(res.data));
        } catch (error) {
            snackActions.error(error.response.data);
        } finally {
            dispatch(setDashboardFetching(false));
        }
    }, 1000);
};

export const getQuestionPaperForSupervisor = (dispatch, examId) => {
    dispatch(setDashboardFetching(true));
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await userRequest.get(
                `${FETCH_QUESTION_PAPER}?examId=${examId}`
            );
            dispatch(setSelectedQuestionPaper(res.data));
        } catch (error) {
            if (error.response.status === 400) {
                snackActions.warning("No questions found in question bank.");
            } else {
                snackActions.error(error.response.data);
            }
        } finally {
            dispatch(setDashboardFetching(false));
        }
    }, 1000);
};

export const editQuestionPaper = (dispatch, history, questionPaper) => {
    dispatch(setDashboardFetching(true));
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await userRequest.put(
                FETCH_QUESTION_PAPER,
                questionPaper
            );
            history.go(0);
            snackActions.success(res.data);
        } catch (error) {
            snackActions.error(error.response.data);
        } finally {
            dispatch(setDashboardFetching(false));
        }
    }, 1000);
};

export const getStudentsOfExam = (dispatch, examId) => {
    dispatch(setDashboardFetching(true));
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await userRequest.get(
                `${FETCH_STUDENTS_OF_EXAM}?examId=${examId}`
            );
            dispatch(setEnrolledStudents(res.data));
        } catch (error) {
            snackActions.error(error.response.data);
        } finally {
            dispatch(setDashboardFetching(false));
        }
    }, 1000);
};

export const deleteStudentFromExam = async (dispatch, examId, studentsList) => {
    dispatch(setDashboardFetching(true));
    try {
        const res = await userRequest.delete(FETCH_STUDENTS_OF_EXAM, {
            data: { examId: examId, studentsList: studentsList },
        });
        getStudentsOfExam(dispatch, examId);
        snackActions.success(res.data);
    } catch (error) {
        console.log(error);
        snackActions.error(error.response.data);
    } finally {
        dispatch(setDashboardFetching(false));
    }
};

export const addStudentToExam = (dispatch, history, examId, studentIds) => {
    dispatch(setDashboardFetching(true));
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await userRequest.post(FETCH_STUDENTS_OF_EXAM, {
                examId: examId,
                studentsList: studentIds,
            });
            history.push(`/dashboard/exam/my-exams/${examId}/manage-students`);
            snackActions.success(res.data);
        } catch (error) {
            console.log("there was some error");
            snackActions.error(error.response.data);
        } finally {
            dispatch(setDashboardFetching(false));
        }
    }, 1000);
};
