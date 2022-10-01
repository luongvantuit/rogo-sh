import { configureStore } from "@reduxjs/toolkit";
import { sliderBarReducer } from "../slices/SliderBarSlice";

export const sliderBarStore = configureStore({
    reducer: {
        sliderBarState: sliderBarReducer,
    },
});
