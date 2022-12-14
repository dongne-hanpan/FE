import React from 'react';
import { createRoot } from 'react-dom/client';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import App from './App';
import theme from './shared/css/theme';
import store from './shared/redux/configure';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif;
    }
    .App {
        position: relative;
        width: 100vw;
        height: 100vh;
    }
    body {
        margin: 0px;
        background-color: ${({theme}) => theme.colors.background};
        overflow: hidden;
        font-family: 'Noto Sans KR', sans-serif;
    }
    h1{
        margin: 0px;
    }
    h2{
        margin: 0px;
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
const root = createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </Provider>
);