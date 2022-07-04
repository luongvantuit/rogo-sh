import { createSlice } from "@reduxjs/toolkit";

export let roomInfoStack = null;

export const roomInfoSlide = createSlice({
  name: "room-info",
  initialState: {
    value: null,
  },
  reducers: {
    setRoom: (state, action) => {
      roomInfoStack = action.payload;
      state.value = action.payload;
    },
    clearRoom: (state) => {
      roomInfoStack = null;
      state.value = null;
    },
  },
});

export const { setRoom, clearRoom } = roomInfoSlide.actions;

export const roomInfoReducer = roomInfoSlide.reducer;
