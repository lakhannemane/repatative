import { createSlice } from "@reduxjs/toolkit";

const userAuth = createSlice({
  name: "userAuth",
  initialState: {
    user: {
      userData: {},
      isLoggedIn: false,
      status: "idle", // idle  || pending || success  || rejecting
    },
    reducers: {
      login: (state, action) => {
        state.user.userData = action.payload;
        state.user.isLoggedIn = true;
        state.status = "success";
      },
      LogOut: (state, action) => {
        state.user.userData = null;
        state.user.isLoggedIn = false;
        state.status = "success";
        localStorage.clear();
      },
    },
  },
});

export const { login, LogOut } = userAuth.actions;

export default userAuth.reducers;
