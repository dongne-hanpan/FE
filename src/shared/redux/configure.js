import { combineReducers, configureStore, } from '@reduxjs/toolkit';
import userReducer from './modules/userSlice';
import alermReducer from './modules/alermSlice';
import modalReducer from './modules/modalSlice';
import matchReducer from './modules/matchSlice';
import chatReducer from './modules/chatSlice';



const rootReducer = combineReducers({user: userReducer, modal: modalReducer, match: matchReducer, chat: chatReducer, alerm: alermReducer});

const store = configureStore({reducer: rootReducer});

export default store;