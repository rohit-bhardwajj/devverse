// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: null,
        user: null,
        isAuthenticated: false,
    });

    // Load token and set user data if token exists
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Example: Add a call to fetch user info with token here, if needed
            setAuth({ token, user: { /* user details if fetched */ }, isAuthenticated: true });
        }
    }, []);

    // Login function
    const login = (token, user) => {
        localStorage.setItem('token', token);
        // setAuth({ token, user, isAuthenticated: true });
        setAuth((prev) => ({
            ...prev,
            token: token,
            user: user,
            isAuthenticated: true
        }));
    
        window.history.replaceState(null, '', window.location.pathname);
        window.location.reload();

    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setAuth({ token: null, user: null, isAuthenticated: false });
    };

    return (
        <AuthContext.Provider key={auth.isAuthenticated} value={{ auth, setAuth, login, logout }}>
    {children}
</AuthContext.Provider>

    );
};

export const useAuth = () => useContext(AuthContext);
