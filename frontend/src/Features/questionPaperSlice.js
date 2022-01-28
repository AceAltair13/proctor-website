import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    faceRegistered: false,
    isFetching: false,
    currentQuestionId: 0,
    totalQuestions: 0,
    questions: [],
    submitDialogOpen: false,
};

const questionPaperSlice = createSlice({
    name: "questionPaper",
    initialState,
    reducers: {
        setFaceRegistered: (state, action) => {
            state.faceRegistered = action.payload;
        },
        setQuestionList: (state, action) => {
            state.questions = action.payload;
            state.currentQuestionId = 0;
            state.totalQuestions = action.payload.length;
            state.isFetching = false;
        },
        setCurrentQuestionId: (state, action) => {
            state.currentQuestionId = action.payload;
        },
        setQuestionAttempted: (state, action) => {
            state.questions[state.currentQuestionId].selectedOption =
                action.payload;
            state.questions[state.currentQuestionId].attempted = true;
        },
        setQuestionMarkedForReview: (state) => {
            state.questions[state.currentQuestionId].markedForReview =
                !state.questions[state.currentQuestionId].markedForReview;
        },
        setIsQuestionPaperFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setSubmitDialogOpen: (state, action) => {
            state.submitDialogOpen = action.payload;
        },
        resetQuestionPaper: () => initialState,
    },
});

export const {
    setFaceRegistered,
    setQuestionList,
    setCurrentQuestionId,
    setQuestionAttempted,
    setQuestionMarkedForReview,
    setIsQuestionPaperFetching,
    resetQuestionPaper,
    setSubmitDialogOpen,
} = questionPaperSlice.actions;
export default questionPaperSlice.reducer;
