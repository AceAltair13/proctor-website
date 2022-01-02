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
    },
});

export const { setDashboardTitle, setMobileOpen } = dashboardSlice.actions;
export default dashboardSlice.reducer;
