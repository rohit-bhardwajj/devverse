// src/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    // Load user data from local storage when app starts
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally, fetch user data using the token
            // Here you can implement a function to get user info based on the token if needed
            setAuth({ token }); // You can set more user info here if available
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
