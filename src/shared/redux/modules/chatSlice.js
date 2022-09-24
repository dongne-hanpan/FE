import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteWithCookie, getWithCookie, postWithCookie } from '../../axios/axios';
import { getCookie } from '../../axios/cookie';

export const getChatDataThunk = createAsyncThunk(
  "chat/getChatDataThunk",
  async(match_id) => {
    const cookie = getCookie('mytoken');
    const res = await getWithCookie(`/api/match/chatroom/${match_id}`,cookie);
    return res;
  }
)
export const getMyChatListThunk = createAsyncThunk(
  "chat/getMyChatListThunk",
  async() => {
    const cookie = getCookie('mytoken');
    const res = await getWithCookie(`/api/user/chat-list`,cookie);
    return res;
  }
)
export const reservedChatThunk = createAsyncThunk(
  "chat/reservedChatThunk",
  async(match_id) => {
    const cookie = getCookie('mytoken');
    const res = await getWithCookie(`/api/match/match-status-reserved/${match_id}`, cookie);
    return res;
  }
);
export const leaveChatThunk = createAsyncThunk(
  "chat/leaveChatThunk",
  async(match_id) => {
    const cookie = getCookie('mytoken');
    const res = await deleteWithCookie(`/api/match/delete/${match_id}`, cookie);
    return res;
  }
);
export const submitMyResultThunk = createAsyncThunk(
  "chat/submitMyResultThunk",
  async (sports,myResultData) => {
    console.log(myResultData);
    const cookie = getCookie('mytoken');
    const res = await postWithCookie(`/api/${sports}/result`, myResultData, cookie);
    return res;
  }
)
export const submitCommentThunk = createAsyncThunk(
  "chat/submitCommentThunk",
  async (comment_data) => {
    const cookie = getCookie('mytoken');
    const res = await postWithCookie(`/api/user/comment`, comment_data, cookie);
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
  },
  extraReducers: (builder) => {
    builder.addCase(getChatDataThunk.fulfilled, (state,action) => {
      console.log('get chatData completed');
      state.nowChatData = action.payload;
    });
    builder.addCase(getMyChatListThunk.fulfilled, (state,action) => {
      console.log('get my chatList completed');
      state.chatList = action.payload;
    });
    builder.addCase(reservedChatThunk.fulfilled, (state,action) => {
      console.log('change match status to reserved');
      console.log(action.payload);
    });
    builder.addCase(submitMyResultThunk.fulfilled, (state,action) => {
      console.log('result submit completed');
      console.log(action.payload);
    });
    builder.addCase(submitCommentThunk.fulfilled, (state,action) => {
      console.log('result comment completed');
      console.log(action.payload);
    });
  }
});

export default chatSlice.reducer;
