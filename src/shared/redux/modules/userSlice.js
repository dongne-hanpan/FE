import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithCookie, getwithoutCookie, postWithCookieFormData, postWithoutCookie } from '../../axios/axios';
import { getCookie, deleteCookie } from '../../axios/cookie';


export const signupUserThunk = createAsyncThunk(
  "user/signupUserThunk",
  async (user_data) => {
    const res = await postWithoutCookie("/api/auth/signup", user_data);
    return res
  }
);
export const loginUserThunk = createAsyncThunk(
  "user/loginUserThunk",
  async (user_data) => {
    const res = await postWithoutCookie("/api/auth/login", user_data);
    return res;
  }
);
export const loginKakaoThunk = createAsyncThunk(
  "user/loginKakaoThunk",
  async (kakaoCode) => {
    const res = await getwithoutCookie(`/user/kakao/callback?code=${kakaoCode}`);
    return res;
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
export const updateProfileThunk = createAsyncThunk(
  "match/updateProfileThunk",
  async(image_data) => {
    const cookie = getCookie('mytoken');
    const res = await postWithCookieFormData(`/api/user/upload-image`, image_data, cookie);
    return res;
  }
);


const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userData: {},
    userStatus: null,
    error:{}
  },
  reducers: {
    clearUserStatus: (state) => {
      state.userStatus = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signupUserThunk.fulfilled, (state, action) =>{
    });
    builder.addCase(loginUserThunk.fulfilled,(state, action) => {
      const res = action.payload;
      if(res.status !== 500){
        if(res.statusCode){
          const errorObj = {
            errorType: 'loginUserThunk',
            ...res
          }
          state.error = errorObj;
        }else{
          const accessToken = res.accessToken;
          document.cookie = `mytoken=${accessToken}; path=/;`;
          const newUserData = {
            userId: res.userId,
            username: res.username,
            nickname: res.nickname,
            profileImage: res.profileImage,
          };
          state.error = {};
          state.userData = newUserData;
        }
      }
    });
    builder.addCase(loginKakaoThunk.fulfilled,(state, action) => {
      const res = action.payload;
      if(res.status !== 500){
        if(res.statusCode){
          const errorObj = {
            errorType: 'loginKakaoThunk',
            ...res
          }
          state.error = errorObj;
        }else{
          const accessToken = res.accessToken;
          document.cookie = `mytoken=${accessToken}; path=/;`;
          const newUserData = {
            userId: res.kakaoId,
            username: res.kakaoId,
            nickname: res.nickname,
            profileImage: res.profileImage,
          };
          state.error = {};
          state.userData = newUserData;
        }
      }
    });
    builder.addCase(refreshUserThunk.fulfilled,(state,action) => {
      const res = action.payload;
      if(res.status !== 500){
        if(res.statusCode){
          deleteCookie('mytoken');
          const errorObj = {
            errorType: 'refreshUserThunk',
            ...res
          }
          state.error = errorObj;
        }else{
          const data = action.payload;
          const newUserData = {
            userId: res.userId,
            username: data.username,
            nickname: data.nickname,
            profileImage: data.profileImage,
          };
          state.error = {};
          state.userData = newUserData;
        }
      }else{
        deleteCookie('mytoken');
      }
    });
    builder.addCase(logoutUserThunk.fulfilled,(state,action) => {
      deleteCookie("mytoken");
      state.userData = {};
      state.userStatus = 'logoutUserThunk';
    });
    builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
      const res = action.payload;
      if(res.statusCode){
        const errorObj = {
          errorType: 'updateProfileThunk',
          ...res
        }
        state.error = errorObj;
      }else{
        state.userData = {...state.userData, profileImage:action.payload}
      }
    });
  }
});

export const { clearUserStatus } = userSlice.actions;
export default userSlice.reducer;
