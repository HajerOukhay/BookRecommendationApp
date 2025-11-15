import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    logoutUser: (state) => {
      state.username = null;
      state.email = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
