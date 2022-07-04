import { createSlice } from "@reduxjs/toolkit";

export const roomInfoSlide = createSlice({
  name: "room-info",
  initialState: {
    value: null,
  },
  reducers: {
    setRoom: (state, action) => {
      state.value = action.payload;
    },
    clearRoom: (state) => {
      state.value = null;
    },
  },
});

export const { setRoom, clearRoom } = roomInfoSlide.actions;

export const roomInfoReducer = roomInfoSlide.reducer;
