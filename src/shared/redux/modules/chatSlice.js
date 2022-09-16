import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postWithCookie, postWithoutCookie } from '../../axios/axios';
import { deleteCookie, getCookie } from '../../axios/cookie';


export const leaveChatThunk = createAsyncThunk(
  "user/loginUserThunk",
  async (user_data) => {
    const res = await postWithoutCookie("/api/auth/login", user_data);
    return res;
  }
);
export const submitResultThunk = createAsyncThunk(
  "chat/submitResultThunk",
  async (sports,result_data) => {
    const cookie = getCookie('mytoken');
    const res = await postWithCookie(`/api/${sports}/result`, result_data, cookie);
    return res;
  }
)

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    chatList:[],
    nowChatData:{

    }
  },
  reducers: {
    clearUser: (state, action) => {
      deleteCookie("mytoken");
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitResultThunk.fulfilled, (state,action) => {
      console.log('result submit completed');
      console.log(action.payload);
    })
  }
});

export default chatSlice.reducer;
