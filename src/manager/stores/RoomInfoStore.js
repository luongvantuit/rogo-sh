import { configureStore } from "@reduxjs/toolkit";
import { roomInfoReducer } from "../slices/RoomInfoSlice";

export const roomInfoStore = configureStore({
  reducer: {
    roomInfoState: roomInfoReducer,
  },
});
