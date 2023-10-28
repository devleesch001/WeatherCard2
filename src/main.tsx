import React from 'react';
import ReactDOM from 'react-dom/client';

import './i18n';
import './main.css';
import './axios.ts';

import App from './App.tsx';
import UserProvider from './provider/UserProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <UserProvider>
            <App />
        </UserProvider>
    </React.StrictMode>
);
