import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWithCookie, getwithoutCookie, postWithCookie } from '../../axios/axios';
import { getCookie } from '../../axios/cookie';


export const loadAllMatchThunk = createAsyncThunk(
  "match/loadAllMatchThunk",
  async(sports) => {
    const res = await getwithoutCookie(`/api/match/list/${sports}`);
    return res;
  }
);
export const loadMatchThunk = createAsyncThunk(
  "match/loadMatchThunk",
  async(additionalUrl) => {
    const res = await getwithoutCookie(`/api/match/list${additionalUrl}`);
    return res;
  }
);
export const loadMyMatchThunk = createAsyncThunk(
  "match/loadMyMatchThunk",
  async(additionalUrl) => {
    const cookie = getCookie('mytoken');
    const res = await getWithCookie(`/api/user/mypage${additionalUrl}`,cookie);
    return res;
  }
);
export const makeMatchThunk = createAsyncThunk(
  "match/makeMatchThunk",
  async(match_data) => {
    const cookie = getCookie('mytoken');
    const res = await postWithCookie("/api/match/write", match_data,cookie);
    return res;
  }
);


const matchSlice = createSlice({
  name: "matchSlice",
  initialState: {
    matches: [],
    elseData:{}
  },
  reducers:{
    setModal: (state, action) => {
      state.modalData = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(loadAllMatchThunk.fulfilled, (state, action) => {
      state.matches = action.payload;
    });
    builder.addCase(loadMatchThunk.fulfilled, (state, action) => {
      state.matches = action.payload;
    });
    builder.addCase(loadMyMatchThunk.fulfilled, (state, action) => {
      const {matchList, ...rest} = action.payload;
        // 받아온 MyMatchList 종류별로 정리
      const newSortedChatList = {
        recruitList:[],
        reservedList: [],
        doneList: []
      }
      matchList.map((each) => {
        if(each.matchStatus === 'recruit'){
          newSortedChatList.recruitList.push(each)
        } else if(each.matchStatus === 'reserved'){
          newSortedChatList.reservedList.push(each)
        } else if(each.matchStatus === 'done'){
          newSortedChatList.doneList.push(each)
        }
      })
      state.elseData = rest;
      state.matches = newSortedChatList;
    });
    builder.addCase(makeMatchThunk.fulfilled, (state, action) => {
      state.matches = action.payload;
    });
  }
});

export default matchSlice.reducer;
