import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Typography, Box, Paper } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Dark theme for code highlighting

const SnippetForm = () => {
    const [title, setTitle] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [submittedSnippet, setSubmittedSnippet] = useState(null); // To display the submitted code snippet

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:5000/api/snippets', {
                title,
                code,
                description,
            });
            console.log(response.data);
            setSubmittedSnippet(response.data); // Display submitted snippet
            setTitle('');
            setCode('');
            setDescription('');
        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Create a New Code Snippet
                </Typography>
                <Paper elevation={3} sx={{ p: 4 }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Title"
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <TextField
                            label="Code"
                            fullWidth
                            multiline
                            minRows={4}
                            margin="normal"
                            variant="outlined"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            multiline
                            minRows={3}
                            margin="normal"
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                            Create Snippet
                        </Button>
                    </form>
                </Paper>
                
                {submittedSnippet && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h5" gutterBottom>
                            Submitted Snippet
                        </Typography>
                        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
                            <Typography variant="h6">{submittedSnippet.title}</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>{submittedSnippet.description}</Typography>
                            <SyntaxHighlighter language="javascript" style={oneDark}>
                                {submittedSnippet.code}
                            </SyntaxHighlighter>
                        </Paper>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default SnippetForm;
