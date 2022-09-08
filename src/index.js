import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './App';
import { Provider } from 'react-redux';
import store from './shared/redux_d/configure';
import './index.css';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    .App {
        position: relative;
    }
    body {
        margin: 0px;
        background-color: var(--color-background);
        &::-webkit-scrollbar {
            display: none;
        }
    }
    button {
        outline: none;
        border: none;
        cursor: pointer;
        padding: 0px;
    }
    input {
        outline: none;
        border: none;
        cursor: pointer;
    }
    textarea {
        outline: none;
        border: none;
        cursor: pointer;
    }
`
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <GlobalStyle />
        <App />
    </Provider>
);