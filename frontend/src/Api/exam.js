import {
    FETCH_CURRENT_EXAM_URL,
    FETCH_EXAMS_URL,
    FETCH_PAST_EXAM_URL,
    FETCH_QUESTION_PAPER,
    FETCH_UPCOMING_EXAM_URL,
} from "../Constants/urls";
import { userRequest } from "../requestMethods";
import { snackActions } from "../Utils/SnackBarUtils";
import {
    fetchExamsStart,
    setCurrentExams,
    setHistoryExams,
    setUpcomingExams,
    fetchExamsFailure,
} from "../Features/studentSlice";
import { setExam, setIsCurrentExamFetching } from "../Features/examSlice";
import {
    setIsQuestionPaperFetching,
    setQuestionList,
} from "../Features/questionPaperSlice";

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

export const fetchQuestionPaper = (dispatch, examId) => {
    dispatch(setIsQuestionPaperFetching(true));
    // Timeout to prevent loading bar vanishing too fast
    setTimeout(async () => {
        try {
            const res = await userRequest.get(
                FETCH_QUESTION_PAPER + "?examId=" + examId
            );
            let questions = res.data;
            console.log(res.data);
            questions.forEach((question) => {
                question.attempted = false;
                question.markedForReview = false;
            });
            dispatch(setQuestionList(questions));
        } catch (error) {
            dispatch(setIsQuestionPaperFetching(false));
            snackActions.error(error.response.data);
        }
    }, 1000);
};
