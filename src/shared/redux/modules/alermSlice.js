import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithCookie, postWithCookie } from '../../axios/axios';
import { getCookie } from '../../axios/cookie';


export const contactHostThunk = createAsyncThunk(
  "match/contactHostThunk",
  async(match_id) => {
    const cookie = getCookie('mytoken');
    const res = await getWithCookie(`/api/match/enter/${match_id}`, cookie);
    return res;
  }
);
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
    alermStatus: null,
    error:{}
  },
  reducers: {
    clearStatus: (state) => {
      state.alermStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(contactHostThunk.fulfilled, (state, action) => {
      const res = action.payload;
      if(res.statusCode){
        const errorObj = {
          errorType: 'contactHostThunk',
          ...res
        }
        state.error = errorObj;
      }else{
        state.alermStatus = 'success';
      }
    });
    builder.addCase(getAlermThunk.fulfilled, (state, action) => {
      state.alermData = action.payload;
    });
    builder.addCase(permitAlermThunk.fulfilled, (state, action) => {
      console.log('permit completed');
      state.alermData = action.payload;
    });
  }
});

export const { clearStatus } = alermSlice.actions;
export default alermSlice.reducer;
