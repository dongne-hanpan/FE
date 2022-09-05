import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: {},
  },
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
    },
    loginUser: (state, action) => {},
    signupUser: (state, action) => {},
    clearUser: (state, action) => {},
  },
});

export const { loadUser } = userSlice.actions;
export default userSlice.reducer;
