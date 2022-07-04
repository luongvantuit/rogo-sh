import { configureStore } from "@reduxjs/toolkit";
import { roomInfoReducer } from "../slices/room-info-slice";

export const roomInfoStore = configureStore({
  reducer: {
    roomInfoState: roomInfoReducer,
  },
});
