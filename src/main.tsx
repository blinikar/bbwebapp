import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MantineProvider } from "@mantine/core";
import { theme } from "/src/app/theme.ts";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
            <App/>
        </MantineProvider>
    </React.StrictMode>,
)
