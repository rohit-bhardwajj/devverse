import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import axios from 'axios';

const BlogForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [author, setAuthor] = useState('614c0e9e1c4d5a34b4e100f1'); // Replace with a valid ObjectId from your User collection


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the blog data
        const blogData = {
            title,
            content,
            tags: tags.split(',').map(tag => tag.trim()), // Convert tags to an array
            author // Make sure this is a valid ObjectId
        };

        try {
            const response = await axios.post('http://localhost:5000/api/blogs', blogData);
            console.log('Blog submitted successfully:', response.data);

            // Clear the form fields after submission
            setTitle('');
            setContent('');
            setTags('');
        } catch (error) {
            console.error('Error submitting blog:', error.response.data);
        }
    };

    return (
        <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Create a New Blog
                </Typography>
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
                    <Box display="flex" justifyContent="space-between" mt={3}>
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
