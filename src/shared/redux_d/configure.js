import { combineReducers, configureStore, } from '@reduxjs/toolkit';
import userReducer from './modules/userSlice';
import modalReducer from './modules/modalSlice';


const rootReducer = combineReducers({user: userReducer, modal: modalReducer});

const store = configureStore({reducer: rootReducer});

export default store;