import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Alert, Input } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const BlogForm = ({ userId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [photo, setPhoto] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Please log in to create a blog.');
            setTimeout(() => {
                navigate('/login', { state: { message: 'Please log in to create a blog post.' } });
            }, 2000);
        }
    }, [navigate]);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0])
    
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tags', JSON.stringify(tags.split(',').map(tag => tag.trim())));
        formData.append('author', userId);
        if (photo) formData.append('photo', photo);

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You are not authorized. Please log in again.');
            return;
        }

        // Use toast.promise with the axios.post request
        toast.promise(
            axios.post('http://localhost:5000/api/blogs/createblog', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                setMessage('Your blog has been submitted for review and will be published upon approval.');
                setTitle('');
                setContent('');
                setTags('');
                setPhoto(null);
                setError(null);
            }),
            {
                loading: 'Submitting your blog...',
                success: 'Blog submitted successfully!',
                error: 'Failed to submit the blog. Please try again.'
            }
        );
    };

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Create a New Blog
                </Typography>

                {message && <Alert severity="success" sx={{ mb: 2 }}>{message}</Alert>}
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        multiline
                        minRows={6}
                        required
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <TextField
                        label="Tags (comma-separated)"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    
                    <Box mt={2}>
                        <Input
                            type="file"
                            onChange={handlePhotoChange}
                            inputProps={{ accept: 'image/*' }}
                            key={photo || ''}  // This key will force re-render when photo changes
                        />
                    </Box>

                    <Box display="flex" justifyContent="center" mt={3}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit Blog
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default BlogForm;
