import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exams: [],
    selectedExam: {},
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
        resetSupervisor: () => initialState,
    },
});

export const { setSupervisorExams, setSelectedExam, resetSupervisor } =
    supervisorSlice.actions;
export default supervisorSlice.reducer;
