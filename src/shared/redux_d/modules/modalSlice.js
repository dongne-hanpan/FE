import { createSlice } from '@reduxjs/toolkit';


const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    modalData: {
    },
    dialogueData:
    {}
    // {
    //   dialType: 'confirmRemove',
    // }
    // {
    //   dialType: 'confirmSignup',
    // }
    // {
    //   dialType: 'confirmLogin',
    // }
    // {
    //   dialType: 'confirmWrite',
    // }
    // {
    //   dialType: 'confirmApply',
    // }
    // {
    //   dialType: 'confirmResult',
    // }
  },
  reducers:{
    setModal: (state, action) => {
      state.modalData = action.payload;
    },
    clearModal: (state, action) => {
      state.modalData = {};
    },
    setDialogue: (state, action) => {
      state.dialogueData = action.payload;
    },
    clearDialogue: (state,action) => {
      state.dialogueData = {};
    },
    clearAll: (state,action) => {
      state.modalData = {};
      state.dialogueData = {};
    }
  }
});

export const { setModal, clearModal } = modalSlice.actions;
export const { setDialogue, clearDialogue } = modalSlice.actions;
export const { clearAll } = modalSlice.actions;
export default modalSlice.reducer;

