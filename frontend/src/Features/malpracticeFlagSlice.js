import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    faceDetected: false,
    knownPerson: false,
    noPerson: false,
    multiPerson:false,
    mobileFound: false,
    laptopFound:false,

};

const malpracticeTypesSlice = createSlice({
    name: "malpracticeTypes",
    initialState: initialState,
    reducers: {
        flipFaceDetected: (state,action) => {
            state.faceDetected = action.payload;
        },
        flipKnownPerson: (state,action) => {
            state.knownPerson = action.payload;
        },
        flipNoPerson: (state,action) => {
            state.noPerson = action.payload;
        },
        flipMultiPerson: (state,action) => {
            state.multiPerson = action.payload;
        },
        flipMobileFound: (state,action) => {
            state.mobileFound = action.payload;
        },
        flipLaptopFound: (state,action) => {
            state.laptopFound = action.payload;
        },
        resetMalpracticeTypes: () => initialState,
    },
});

export const {
    flipFaceDetected,
    flipKnownPerson,
    flipNoPerson,
    flipMultiPerson,
    flipMobileFound,
    flipLaptopFound,
    resetMalpracticeTypes,
} = malpracticeTypesSlice.actions;
export default malpracticeTypesSlice.reducer;


