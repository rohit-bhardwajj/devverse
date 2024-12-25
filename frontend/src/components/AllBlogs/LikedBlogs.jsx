import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from '../BlogCard/BlogCard'; // Assuming you already have a BlogCard component
import { toast } from 'react-hot-toast';

const apiUrl = 'http://localhost:5000/';

const LikedBlogs = () => {
    const [likedBlogs, setLikedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLikedBlogs = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please log in to view liked blogs.');
                setLoading(false);
                return;
            }
            try {
                const response = await axios.get(`${apiUrl}api/blogs/liked-blogs`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLikedBlogs(response.data);
            } catch (error) {
                toast.error('Failed to fetch liked blogs.');
                console.error('Error fetching liked blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLikedBlogs();
    }, []);

    if (loading) {
        return <p className="text-center">Loading liked blogs...</p>;
    }

    if (likedBlogs.length === 0) {
        return <p className="text-center">No liked blogs yet.</p>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold text-center mb-6">Liked Blogs</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedBlogs.map((blog) => (
                    <BlogCard key={blog._id} {...blog} />
                ))}
            </div>
        </div>
    );
};

export default LikedBlogs;
