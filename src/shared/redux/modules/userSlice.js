import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithCookie, postWithCookieFormData, postWithoutCookie } from '../../axios/axios';
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
    error:{}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupUserThunk.fulfilled, (state, action) =>{
    });
    builder.addCase(loginUserThunk.fulfilled,(state, action) => {
      const res = action.payload;
      if(res.statusCode){
        state.error = res;
      }else{
        const accessToken = res.accessToken;
        document.cookie = `mytoken=${accessToken}; path=/;`;
        const newUserData = {
          username: res.username,
          nickname: res.nickname,
          profileImage: res.profileImage,
        };
        state.error = {};
        state.userData = newUserData;
      }
    });
    builder.addCase(refreshUserThunk.fulfilled,(state,action) => {
      const res = action.payload;
      if(res.statusCode){
        console.log('hello');
        deleteCookie('mytoken');
        const errorObj = {
          errorType: 'refreshUserThunk',
          ...res
        }
        state.error = errorObj;
      }else{
        const data = action.payload;
        const newUserData = {
          username: data.username,
          nickname: data.nickname,
          profileImage: data.profileImage,
        };
        state.error = {};
        state.userData = newUserData;
      }
    });
    builder.addCase(logoutUserThunk.fulfilled,(state,action) => {
      console.log('logout completed');
      deleteCookie("mytoken");
      state.userData = {};
    });
    builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
      if(action.payload.status === 500){
        alert('프로필 사진 변경을 실패했습니다.')
      } else{
        console.log('post image completed');
        state.userData = {...state.userData, profileImage:action.payload}
      }
    });
  }
});

export const getUserData = (state) => state.user.userData;
export const getAuthError = (state) => state.user.error;
export default userSlice.reducer;
