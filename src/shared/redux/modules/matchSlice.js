import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWithCookie, getwithoutCookie, postWithCookie, putWithCookie } from '../../axios/axios';
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
export const updateMatchThunk = createAsyncThunk(
  "match/updateMatchThunk",
  async(match_data) => {
    const res = await putWithCookie("/api/match/update", match_data);
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
      state.elseData = rest;
      state.matches = matchList;
    });
    builder.addCase(makeMatchThunk.fulfilled, (state, action) => {
      console.log('make match completed');
      state.matches = action.payload;
    });
    builder.addCase(updateMatchThunk.fulfilled, (state, action) => {
      console.log('update match completed');
    });
  }
});

export default matchSlice.reducer;
