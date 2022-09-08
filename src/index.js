import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import App from './App';
import theme from './shared/y_css/theme';
import store from './shared/redux_d/configure';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    .App {
        position: relative;
    }
    body {
        margin: 0px;
        background-color: ${({theme}) => theme.colors.background};
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
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <App />
        </ThemeProvider>
    </Provider>
);