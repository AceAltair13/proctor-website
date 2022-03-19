import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exams: [],
    selectedExam: {},
    selectedQuestionPaper: [],
    selectedQuestionId: 0,
    supervisorDialogOpen: false,
};

const supervisorSlice = createSlice({
    name: "supervisor",
    initialState: initialState,
    reducers: {
        setSupervisorExams: (state, action) => {
            state.exams = action.payload;
        },
        setSelectedExam: (state, action) => {
            state.selectedExam = action.payload;
        },
        setSelectedQuestionPaper: (state, action) => {
            state.selectedQuestionPaper = action.payload;
        },
        setSelectedQuestionId: (state, action) => {
            state.selectedQuestionId = action.payload;
        },
        setSupervisorDialogOpen: (state, action) => {
            state.supervisorDialogOpen = action.payload;
        },
        resetSupervisor: () => initialState,
    },
});

export const {
    setSupervisorExams,
    setSelectedExam,
    setSelectedQuestionPaper,
    setSelectedQuestionId,
    setSupervisorDialogOpen,
    resetSupervisor,
} = supervisorSlice.actions;
export default supervisorSlice.reducer;
