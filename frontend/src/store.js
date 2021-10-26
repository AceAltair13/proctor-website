import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Reducers/user";

export default configureStore({
    reducer: {
        user: userSlice,
    },
});
