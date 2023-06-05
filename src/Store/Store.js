import { configureStore } from "@reduxjs/toolkit";
import UserSliceReducer from "./Slice/UserSlice";

export const store = configureStore({
  reducer: {
    isAuth: UserSliceReducer,
  },
});
