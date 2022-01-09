import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    exams: {
        upcoming: [],
        history: [],
        current: [],
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
        setUpcomingExams: (state, action) => {
            state.isFetching = false;
            state.exams.upcoming = action.payload;
        },
        setHistoryExams: (state, action) => {
            state.isFetching = false;
            state.exams.history = action.payload;
        },
        setCurrentExams: (state, action) => {
            state.isFetching = false;
            state.exams.current = action.payload;
        },
        fetchExamsFailure: (state) => {
            state.isFetching = false;
        },
        setDashboardTitle: (state, action) => {
            state.dashboardTitle = action.payload;
        },
        resetStudent: () => initialState,
    },
});

export const {
    fetchExamsStart,
    setCurrentExams,
    setHistoryExams,
    setUpcomingExams,
    fetchExamsFailure,
    resetStudent,
} = studentSlice.actions;
export default studentSlice.reducer;
