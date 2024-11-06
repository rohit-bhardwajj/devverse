import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../BlogCard/BlogCard';
import './BlogList.css';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/blogs`);
                const blogsData = Array.isArray(response.data) ? response.data : [];
                setBlogs(blogsData);
            } catch (err) {
                setError('Error fetching blogs');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="blog-list-container">
            <h2 className="blog-list-header">Blog List</h2>
            {blogs.length === 0 ? (
                <p className="no-blogs-message">No blogs available for display.</p>
            ) : (
                <div className="blog-grid">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            id={blog._id}
                            title={blog.title}
                            slug={blog.slug}
                            description={blog.content}
                            category={blog.category}
                            createdAt={blog.createdAt}
                            author={blog.author?.username || 'Unknown'}
                            photo={blog.photo} // Add photo prop here
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogList;
