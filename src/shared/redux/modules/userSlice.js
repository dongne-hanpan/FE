import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithCookie, postWithoutCookie } from '../../axios/axios';
import { getCookie, deleteCookie } from '../../axios/cookie';


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
export const refreshUserThunk = createAsyncThunk(
  "user/refreshtUserThunk",
  async () => {
    const cookie = getCookie('mytoken');
    const res = await getWithCookie("/api/auth/refresh", cookie);
    return res;
  }
);
export const logoutUserThunk = createAsyncThunk(
  "user/logoutUserThunk",
  async () => {
    const cookie = getCookie('mytoken');
    const res = await getWithCookie("/api/auth/logout", cookie);
    return res;
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
        state.userData = newUserData;
        console.log(state.userData);
      } else{
        alert('로그인 실패했습니다');
      }
    });
    builder.addCase(refreshUserThunk.fulfilled,(state,action) => {
        console.log('refresh completed');
        const data = action.payload;
        const newUserData = {
          username: data.username,
          nickname: data.nickname,
          profileImage: data.profileImage,
        };
        state.userData = newUserData;
    });
    builder.addCase(logoutUserThunk.fulfilled,(state,action) => {
      console.log('logout completed');
      deleteCookie("mytoken");
      state.userData = {};
    });
  }
});

export default userSlice.reducer;
