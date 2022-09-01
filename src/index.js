import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import theme from "./shared/redux_j/themeStyle";
// import { ThemeProvider } from "styled-components";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <ThemeProvider theme={theme}>
        <App />
    {/* </ThemeProvider> */}
);