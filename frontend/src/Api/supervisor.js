import { FETCH_EXAMS_URL } from "../Constants/urls";
import { setDashboardFetching } from "../Features/dashboardSlice";
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

export const updateExam = () => {};
