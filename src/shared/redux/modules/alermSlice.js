import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithCookie, postWithCookie } from '../../axios/axios';
import { getCookie } from '../../axios/cookie';

export const getAlermThunk = createAsyncThunk(
  "alerm/getAlermThunk",
  async () => {
    const cookie = getCookie('mytoken');
    const res = await getWithCookie("/api/match/request", cookie);
    return res;
  }
);
export const permitAlermThunk = createAsyncThunk(
  "alerm/permitAlermThunk",
  async (permitData) => {
    const cookie = getCookie('mytoken');
    const res = await postWithCookie("/api/match/permit", permitData, cookie);
    return res;
  }
);


const alermSlice = createSlice({
  name: "alermSlice",
  initialState: {
    alermData: [],
    error:{}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAlermThunk.fulfilled, (state, action) => {
      state.userAlerm = action.payload;
    });
    builder.addCase(permitAlermThunk.fulfilled, (state, action) => {
      console.log('permit completed');
      state.userAlerm = action.payload;
    });
  }
});

export default alermSlice.reducer;
