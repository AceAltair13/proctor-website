import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exams: [],
    selectedExam: {},
    selectedQuestionPaper: [],
    selectedQuestionId: 0,
    selectedStudent: {
        studentId: "",
        studentName: "",
    },
    supervisorDialogOpen: false,
    enrolledStudents: [],
    unsavedChanges: false,
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
        setSelectedStudent: (state, action) => {
            state.selectedStudent = action.payload;
        },
        setSupervisorDialogOpen: (state, action) => {
            state.supervisorDialogOpen = action.payload;
        },
        setEnrolledStudents: (state, action) => {
            state.enrolledStudents = action.payload;
        },
        setUnsavedChanges: (state, action) => {
            state.unsavedChanges = action.payload;
        },
        resetSupervisor: () => initialState,
    },
});

export const {
    setSupervisorExams,
    setSelectedExam,
    setSelectedQuestionPaper,
    setSelectedQuestionId,
    setSelectedStudent,
    setSupervisorDialogOpen,
    resetSupervisor,
    setEnrolledStudents,
    setUnsavedChanges,
} = supervisorSlice.actions;
export default supervisorSlice.reducer;
