import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './AdminPanel.css';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AdminPanel = () => {
    const [unverifiedBlogs, setUnverifiedBlogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUnverifiedBlogs = async () => {
            const token = localStorage.getItem('token'); // Or wherever you're storing the token
            try {
                const response = await axios.get(`${apiUrl}api/blogs/admin`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUnverifiedBlogs(response.data);
            } catch (err) {
                setError('Failed to fetch unverified blogs');
                console.error(err);
            }
        };
        
        fetchUnverifiedBlogs();
    }, []);

    return (
        <div className="admin-panel">
            <h2>Unverified Blogs</h2>
            {error && <p className="error-message">{error}</p>}
            <div>
                {unverifiedBlogs.length > 0 ? (
                    unverifiedBlogs.map((blog) => (
                        <div key={blog._id}>
                            <h3>{blog.title}</h3>
                            <p>{blog.content.slice(0, 100)}...</p>
                        </div>
                    ))
                ) : (
                    <p>No unverified blogs found.</p>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
