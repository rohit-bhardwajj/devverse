import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Alert, Container } from '@mui/material';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const location = useLocation();
    const redirectMessage = location.state?.message;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API}api/auth/login`, formData);
            
            // Check if response.data exists and has success property
            if (response.data) {
                toast.success('Login successful! Redirecting...');
                localStorage.setItem('token', response.data.token); // Store token in localStorage
                setTimeout(() => {
                    navigate('/'); // Redirect after success
                }, 2000);
            } else {
                // Display the message returned by the server if it exists
                toast.error(response.data?.message || 'Unexpected error occurred');
            }
        } catch (error) {
            // Log the error for debugging (optional)
            console.error('Login error:', error.response || error);
            
            // Display a generic error message
            toast.error('Login failed. Please try again later.');
        }
    };
    

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                {redirectMessage && <Alert severity="info" sx={{ mb: 1.5 ,mt:3 ,borderRadius:2 }}>{redirectMessage}</Alert>}
            {error && <Alert severity="error" sx={{ mb: 1.5 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Login
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
