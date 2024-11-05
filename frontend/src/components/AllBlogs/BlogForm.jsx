import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Alert, Input } from '@mui/material';
import axios from 'axios';

const BlogForm = ({ userId }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [photo, setPhoto] = useState(null); // New state for the image
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]); // Set the selected image file
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the form data
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tags', JSON.stringify(tags.split(',').map(tag => tag.trim()))); // Ensure tags are sent as a JSON array
        formData.append('author', userId); // Include the author if needed
        if (photo) formData.append('photo', photo); // Attach the image if selected

        const token = localStorage.getItem('token'); // Retrieve token

        try {
            const response = await axios.post('http://localhost:5000/api/blogs', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' // Set content type for form data
                }
            });
            console.log('Blog submitted successfully:', response.data);
            setMessage('Your blog has been submitted for review and will be published upon approval.');

            // Clear the form fields after submission
            setTitle('');
            setContent('');
            setTags('');
            setPhoto(null);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error submitting blog:', error.response?.data || error.message);
            setError(error.response?.data?.error || 'There was an issue submitting your blog. Please try again later.');
            setMessage(null); // Clear any previous success message
        }
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
                    
                    {/* Image upload field */}
                    <Box mt={2}>
                        <Input
                            type="file"
                            onChange={handlePhotoChange}
                            inputProps={{ accept: 'image/*' }} // Accept only image files
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
