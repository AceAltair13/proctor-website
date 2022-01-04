import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exams: {
        upcoming: [],
        current: [],
        past: [],
    },
    isFetching: false,
};

const studentSlice = createSlice({
    name: "student",
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
        setDashboardTitle: (state, action) => {
            state.dashboardTitle = action.payload;
        },
        resetStudentDashboard: () => initialState,
    },
});

export const {
    fetchExamsStart,
    fetchExamsSuccess,
    fetchExamsFailure,
    resetStudentDashboard,
} = studentSlice.actions;
export default studentSlice.reducer;
