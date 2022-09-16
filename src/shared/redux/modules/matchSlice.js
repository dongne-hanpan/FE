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
export const deleteMatchThunk = createAsyncThunk(
  "match/deleteMatchThunk",
  async() => {
    const res = await deleteWithCookie("/api/match/delete");
    return res;
  }
);
export const contactMatchThunk = createAsyncThunk(
  "match/contactMatchThunk",
  async(apply_data) => {
    const cookie = getCookie('mytoken');
    const res = await postWithCookie("/api/match/contact", apply_data, cookie);
    return res;
  }
);

const matchSlice = createSlice({
  name: "matchSlice",
  initialState: {
    matches: [
      
    ],
  },
  reducers:{
    setModal: (state, action) => {
      state.modalData = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(loadMatchThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.matches = action.payload;
    });
    builder.addCase(loadMyMatchThunk.fulfilled, (state, action) => {
      console.log(action.payload);
      state.matches = action.payload;
    });
    builder.addCase(makeMatchThunk.fulfilled, (state, action) => {
      console.log('make match completed');
    });
    builder.addCase(makeMatchThunk.rejected , (state, action) => {
      console.log('make match failed');
    });
    builder.addCase(updateMatchThunk.fulfilled, (state, action) => {
      console.log('update match completed');
    });
    builder.addCase(deleteMatchThunk.fulfilled, (state, action) => {
      console.log('delete match completed');
    });
    builder.addCase(contactMatchThunk.fulfilled, (state, action) => {
      console.log('contact match completed');
    });
  }
});

export default matchSlice.reducer;
