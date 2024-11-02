import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CardActions, Button } from '@mui/material';
import axios from 'axios';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/blogs');
                setBlogs(response.data);
            } catch (err) {
                setError('Failed to fetch blogs');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) return <Typography variant="h6">Loading...</Typography>;
    if (error) return <Typography variant="h6" color="error">{error}</Typography>;

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom align="center">Latest Blogs</Typography>
            {blogs.map((blog) => (
                <Card key={blog._id} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="h5">{blog.title}</Typography>
                        <Typography variant="body2">{blog.content.substring(0, 100)}...</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">Read More</Button>
                    </CardActions>
                </Card>
            ))}
        </Container>
    );
};

export default BlogList;
