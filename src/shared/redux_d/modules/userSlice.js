import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { clearLocal, getLocal, setLocal } from '../../axios_d/local';
import { getWithCookie, postWithoutCookie } from '../../axios_d/axios';
import { deleteCookie, getCookie } from '../../axios_d/cookie';

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
    console.log(res);
    if(res.status === 201){
      return res.data;
    } else{
      return res.data;
    }
  }
);
export const clearUserThunk = createAsyncThunk(
  "user/clearUserThunk",
  async (user_data) => {
    const cookie = getCookie();
    const refresh = getLocal("refresh");
    // const res = await getWithCookie("/api/auth/logout", cookie, refresh);
    // return res.data;
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(signupUserThunk.fulfilled, (state, action) =>{
      console.log('signup completed');
    });
    builder.addCase(loginUserThunk.fulfilled,(state, action) => {
      console.log('login completed');
      console.log(action.payload);
      // const token = action.payload;
      // const expireDate = new Date(token.accessTokenExpiresIn);
      // document.cookie = `mytoken=${token.accessToken}; path=/; expires=${expireDate}`;
      // const refresh_data = {
      //   refresh: token.refreshToken,
      // };
      // setLocal("refresh", refresh_data);
      // //유저 데이터를 넘겨줘야해.
      // const newUserData = {
      //   username: action.payload.username,
      //   nickname: action.payload.nickname,
      //   profileImage: action.payload.profileImgUrl,
      // };
      // state.userData = newUserData;
    });
    builder.addCase(clearUserThunk.fulfilled, (state, action) => {
      deleteCookie("mytoken");
      clearLocal("refresh");
      state.userData = {};
    });
  }
});

export const { loadUser, loginUser, signupUser } = userSlice.actions;
export default userSlice.reducer;
