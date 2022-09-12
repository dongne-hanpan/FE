import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postWithoutCookie } from '../../axios_d/axios';
import { deleteCookie } from '../../axios_d/cookie';

import me from '../../../asset/profileMe.png';

export const loginUserThunk = createAsyncThunk(
  "user/loginUserThunk",
  async (user_data) => {
    const res = await postWithoutCookie("/api/auth/login", user_data);
    return res;
  }
);
export const signupUserThunk = createAsyncThunk(
  "user/signupUserThunk",
  async (user_data) => {
    const res = await postWithoutCookie("/api/auth/signup", user_data);
    if(res.status === 201){
      return res.data;
    } else{
      return res.data;
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: {
      // userId: 1,
      // username: 'sparta12',
      // nickname: '영동',
      // profileImage: me
    },
  },
  reducers: {
    clearUser: (state, action) => {
      deleteCookie("mytoken");
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUserThunk.fulfilled, (state, action) =>{
      console.log('signup completed');
    });
    builder.addCase(loginUserThunk.fulfilled,(state, action) => {
      if(action.payload.status !== 401){
        console.log('login completed');
        const data = action.payload;
        const accessToken = data.accessToken;
        document.cookie = `mytoken=${accessToken}; path=/;`;
        const newUserData = {
          username: data.username,
          nickname: data.nickname,
          profileImage: data.profileImage,
        };
        state.userData = {...state.userData,...newUserData};
        console.log(state.userData);
      } else{
        alert('로그인 실패했습니다');
      }
    });
  }
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
