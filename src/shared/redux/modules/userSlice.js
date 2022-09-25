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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupUserThunk.fulfilled, (state, action) =>{
      console.log('signup completed');
    });
    builder.addCase(loginUserThunk.fulfilled,(state, action) => {
      if(action.payload.status === 401 || action.payload.status === 500){
        alert('로그인 실패했습니다');
      }else{
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
      }
    });
    builder.addCase(refreshUserThunk.fulfilled,(state,action) => {
      if(action.payload.status === 401 || action.payload.status === 500){
        deleteCookie('mytoken');
        alert('다시 로그인해주세요');
      } else{
        console.log('refresh completed');
        const data = action.payload;
        const newUserData = {
          username: data.username,
          nickname: data.nickname,
          profileImage: data.profileImage,
        };
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

export default userSlice.reducer;
