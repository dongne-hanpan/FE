import { createSlice } from '@reduxjs/toolkit';


const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    modalData: {
    },
  },
  reducers:{
    setModal: (state, action) => {
      state.modalData = action.payload;
    },
    clearModal: (state, action) => {
      state.modalData = {};
    }
  }
});

export const { setModal, clearModal } = modalSlice.actions;
export default modalSlice.reducer;

