import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/authContext';
import Header from './components/Header/Header';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        
        <AuthProvider>
        <App />
        </AuthProvider>
        <Toaster />
    </React.StrictMode>
);
