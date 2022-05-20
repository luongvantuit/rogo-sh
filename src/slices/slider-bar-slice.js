import { createSlice } from "@reduxjs/toolkit";

export const sliderBarSlice = createSlice({
    name: "slider-bar-slice",
    initialState: {
        value: false,
    },
    reducers: {
        toggle: (state) => {
            state.value = !state.value;
        },
        off: (state) => {
            state.value = false;
        },
        on: (state) => {
            state.value = true;
        },
    },
});

export const { toggle, off, on } = sliderBarSlice.actions;

export const sliderBarReducer = sliderBarSlice.reducer;
