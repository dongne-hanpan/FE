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
export const cancelApplyThunk = createAsyncThunk(
  "match/cancelApplyThunk",
  async(match_id) => {
    const cookie = getCookie('mytoken');
    const res = await getWithCookie(`/api/match/cancel/${match_id}`, cookie);
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
    pushAlermData: (state,action) => {
      const newAlermData = [action.payload,...state.alermData];
      state.alermData = newAlermData;
    },
    replaceAlermData: (state,action) => {
      state.alermData = action.payload;
    },
    filterAlermData: (state,action) => {
      const afterFilter = state.alermData.filter((each) => each.match_id !== action.payload);
      state.alermData = afterFilter;
    },
    clearAlerm:(state) => {
      state.alermData = [];
    },
    clearStatus: (state) => {
      state.alermStatus = null;
    },
    clearAlermError:(state) => {
      state.error = {};
    }
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
    builder.addCase(cancelApplyThunk.fulfilled, (state, action) => {
    });
    builder.addCase(getAlermThunk.fulfilled, (state,action) => {
      const resBefore = JSON.stringify(action.payload); 
      const res = JSON.parse(resBefore);
      if(res.statusCode){
        const errorObj = {
          errorType: 'getAlermThunk',
          ...res
        }
        state.error = errorObj;
      }
    });
    builder.addCase(permitAlermThunk.fulfilled, (state, action) => {
      const res = action.payload;
      if(res.statusCode){
        const errorObj = {
          errorType: 'permitAlermThunk',
          ...res
        }
        state.error = errorObj;
      }else{
        state.alermStatus = 'permitAlermThunk';
      }
    });
  }
});

export const { pushAlermData, replaceAlermData, filterAlermData, clearAlerm, clearStatus, clearAlermError } = alermSlice.actions;
export default alermSlice.reducer;
