import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./Features/userSlice";
import studentSlice from "./Features/studentSlice";
import dashboardSlice from "./Features/dashboardSlice";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const allReducers = combineReducers({
    user: userSlice,
    student: studentSlice,
    dashboard: dashboardSlice,
});

const persistedReducer = persistReducer(persistConfig, allReducers);

export default configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
