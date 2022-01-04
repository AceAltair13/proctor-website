import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedExam: {},
    selectedExamQuestions: [],
};

const questionPaperSlice = createSlice({
    name: "questionPaper",
    initialState,
    reducers: {
        setSelectedExam: (state, action) => {
            state.selectedExam = action.payload;
        },
        setSelectedExamQuestions: (state, action) => {
            state.selectedExamQuestions = action.payload;
        },
        resetQuestionPaper: () => initialState,
    },
});

export const { setSelectedExam, setSelectedExamQuestions, resetQuestionPaper } =
    questionPaperSlice.actions;
export default questionPaperSlice.reducer;
