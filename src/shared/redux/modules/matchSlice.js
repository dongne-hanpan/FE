import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteWithCookie, getWithCookie, getwithoutCookie, postWithCookie, putWithCookie } from '../../axios/axios';
import { getCookie } from '../../axios/cookie';


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
export const contactHostThunk = createAsyncThunk(
  "match/contactHostThunk",
  async(match_id) => {
    const cookie = getCookie('mytoken');
    const res = await getWithCookie(`/api/match/enter/${match_id}`, cookie);
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
    builder.addCase(loadMatchThunk.fulfilled, (state, action) => {
      state.matches = action.payload;
    });
    builder.addCase(loadMyMatchThunk.fulfilled, (state, action) => {
      const {matchList, ...rest} = action.payload;
      console.log(rest);
      console.log(matchList);
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
    builder.addCase(contactHostThunk.fulfilled, (state, action) => {
      console.log('enter completed');
    });
  }
});

export default matchSlice.reducer;
