import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exams: [],
    isFetching: false,
};

const studentDashboardSlice = createSlice({
    name: "studentDashboard",
    initialState: initialState,
    reducers: {
        fetchExamsStart: (state) => {
            state.isFetching = true;
        },
        fetchExamsSuccess: (state, action) => {
            state.isFetching = false;
            state.exams = action.payload;
        },
        fetchExamsFailure: (state) => {
            state.isFetching = false;
        },
        resetStudentDashboard: () => initialState,
    },
});

export const {
    fetchExamsStart,
    fetchExamsSuccess,
    fetchExamsFailure,
    resetStudentDashboard,
} = studentDashboardSlice.actions;
export default studentDashboardSlice.reducer;
