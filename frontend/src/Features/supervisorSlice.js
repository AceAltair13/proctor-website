import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exams: [],
};

const supervisorSlice = createSlice({
    name: "supervisor",
    initialState: initialState,
    reducers: {
        setSupervisorExams: (state, action) => {
            state.exams = action.payload;
        },
        resetSupervisor: () => initialState,
    },
});

export const { setSupervisorExams, resetSupervisor } = supervisorSlice.actions;
export default supervisorSlice.reducer;
