import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { deleteWithCookie, getwithoutCookie, postWithCookie, putWithCookie } from '../../axios_d/axios';
import { getCookie } from '../../axios_d/cookie';


export const loadMatchThunk = createAsyncThunk(
  "match/loadMatchThunk",
  async(user_data) => {
    const res = await getwithoutCookie("/api/match/list", user_data);
    return res;
  }
);
export const makeMatchThunk = createAsyncThunk(
  "match/makeMatchThunk",
  async(match_data) => {
    const cookie = getCookie('mytoken');
    const res = await postWithCookie("/api/match/write", match_data,cookie);
    // dispatchEvent()
    // return res;
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
      console.log('load match completed');
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
  }
});

export default matchSlice.reducer;
