import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: {},
  },
  reducers: {
    loadUser: (state, action) => {
      state.userData = action.payload;
    },
    loginUser: (state, action) => {
      state.userData = action.payload;
      console.log(state.userData);
    },
    signupUser: (state, action) => {},
    clearUser: (state, action) => {},
  },
});

export const { loadUser, loginUser, signupUser } = userSlice.actions;
export default userSlice.reducer;
