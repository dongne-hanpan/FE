import { combineReducers, configureStore, } from '@reduxjs/toolkit';
import userReducer from './modules/userSlice';
import modalReducer from './modules/modalSlice';
import matchReducer from './modules/matchSlice';


const rootReducer = combineReducers({user: userReducer, modal: modalReducer, match: matchReducer});

const store = configureStore({reducer: rootReducer});

export default store;