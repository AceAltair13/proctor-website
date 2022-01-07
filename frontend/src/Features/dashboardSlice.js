import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title: "Dashboard",
    mobileOpen: false,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: initialState,
    reducers: {
        setDashboardTitle: (state, action) => {
            state.title = action.payload;
        },
        setMobileOpen: (state) => {
            state.mobileOpen = !state.mobileOpen;
        },
        resetDashboard: () => initialState,
    },
});

export const { setDashboardTitle, setMobileOpen, resetDashboard } =
    dashboardSlice.actions;
export default dashboardSlice.reducer;
