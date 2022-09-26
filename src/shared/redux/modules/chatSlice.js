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
export const submitMyResultThunk = createAsyncThunk(
  "chat/submitMyResultThunk",
  async (sports, match_id, myScore) => {
    const myResultData = {
      "match_id": match_id,
      "myScore": myScore,
    }
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
export const leaveChatThunk = createAsyncThunk(
  "chat/leaveChatThunk",
  async(match_id) => {
    const cookie = getCookie('mytoken');
    const res = await deleteWithCookie(`/api/match/delete/${match_id}`, cookie);
    return res;
  }
);

const chatSlice = createSlice({
  name: "chatSlice",
  initialState: {
    chatList:[],
    nowChatData:{},
    chatStatus: {},
    error:{}
  },
  reducers: {
    clearChatData: (state) => {
      state.nowChatData = {};
    },
    clearChatStatus: (state) => {
      state.chatStatus = {};
    },
    clearChatError: (state) => {
      state.error = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatDataThunk.fulfilled, (state,action) => {
      const res = action.payload;
      if(res.statusCode){
        const errorObj = {
          errorType: 'getChatDataThunk',
          ...res
        }
        state.chatStatus = {};
        state.error = errorObj;
      }else{
        state.error = {};
        state.nowChatData = action.payload;
      }
    });
    builder.addCase(getMyChatListThunk.fulfilled, (state,action) => {
      state.chatList = action.payload;
    });
    builder.addCase(reservedChatThunk.fulfilled, (state,action) => {
      const res = action.payload;
      if(res.statusCode){
        const errorObj = {
          errorType: 'reservedChatThunk',
          ...res
        }
        state.chatStatus = {};
        state.error = errorObj;
      }else{
        state.error = {};
        const successObj = {
          statusType: 'reservedChatThunk',
          status: 'success'
        }
        state.chatStatus = successObj;
      }
    });
    builder.addCase(submitMyResultThunk.fulfilled, (state,action) => {
      console.log('result submit completed');
      console.log(action.payload);
    });
    builder.addCase(submitCommentThunk.fulfilled, (state,action) => {
      console.log('result comment completed');
      console.log(action.payload);
    });
    builder.addCase(leaveChatThunk.fulfilled, (state,action) => {
      const res = action.payload;
      if(res.statusCode){
        const errorObj = {
          errorType: 'leaveChatThunk',
          ...res
        }
        state.chatStatus = {};
        state.error = errorObj;
      }else{
        state.error = {};
        const successObj = {
          statusType: 'leaveChatThunk',
          status: 'success'
        }
        state.chatStatus = successObj;
        state.nowChatData = {};
      }
    });
  }
});

export const { clearChatData, clearChatStatus, clearChatError } = chatSlice.actions;
export default chatSlice.reducer;
