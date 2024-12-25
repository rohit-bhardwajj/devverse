import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../BlogCard/BlogCard';
import './BlogList.css';
import Loader from '../loader';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/';
const BlogList = () => {
    
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${apiUrl}api/blogs`);
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

    if (loading) return <Loader/>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="blog-list-container max-w-4xl mx-auto my-6 px-4">
            <h2 className="text-2xl font-semibold mb-4">Blog List</h2>
            {blogs.length === 0 ? (
                <p className="text-gray-500">No blogs available for display.</p>
            ) : (
                <div className="space-y-4">
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
