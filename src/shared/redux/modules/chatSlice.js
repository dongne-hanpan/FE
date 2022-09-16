import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithCookie, postWithCookie, postWithoutCookie } from '../../axios/axios';
import { deleteCookie, getCookie } from '../../axios/cookie';

export const getChatDataThunk = createAsyncThunk(
  "chat/getChatDataThunk",
  async(match_id) => {
    const cookie = getCookie('mytoken');
    const res = await getWithCookie(`/api/match/chatroom/${match_id}`,cookie);
    console.log(res);
    return res;
  }
)

export const leaveChatThunk = createAsyncThunk(
  "chat/leaveChatThunk",
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
    builder.addCase(getChatDataThunk.fulfilled, (state,action) => {
      console.log('get chatData completed');
      state.nowChatData = action.payload;
    });
    builder.addCase(submitResultThunk.fulfilled, (state,action) => {
      console.log('result submit completed');
      console.log(action.payload);
    });
  }
});

export default chatSlice.reducer;
