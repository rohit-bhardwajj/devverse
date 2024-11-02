import React, { useState } from 'react';
import { Container, Button, Box, Typography, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password,
            });
            localStorage.setItem('token', response.data.token); // Store JWT in local storage
            alert('Login successful!');
            navigate('/'); // Redirect to home page or desired route after login
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
                <Typography variant="h5">Sign In</Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', mt: 1 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
                <Button 
                    onClick={() => navigate('/register')} 
                    variant="text" 
                    color="secondary" 
                    style={{ marginTop: '16px' }}
                >
                    Don't have an account? Sign Up
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
