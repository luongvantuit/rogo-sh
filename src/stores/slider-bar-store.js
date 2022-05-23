import { configureStore } from "@reduxjs/toolkit";
import { sliderBarReducer } from "../slices/slider-bar-slice";

export const sliderBarStore = configureStore({
    reducer: {
        sliderBarState: sliderBarReducer,
    },
});
