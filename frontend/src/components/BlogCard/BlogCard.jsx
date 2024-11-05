import React, { useState } from 'react';
import styles from './BlogCard.module.css';
import moment from 'moment';
import { TbWriting } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogCard = ({ id, title, slug, description, category, createdAt, author = "Rohit Bhardwaj", likes = 0, photo }) => {
    const [likeCount, setLikeCount] = useState(likes);

    const handleLike = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/blogs/like/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setLikeCount(response.data.likes);
        } catch (error) {
            console.error('Error liking the blog:', error);
        }
    };
    

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <img 
                    className={styles.image} 
                    src={`${apiUrl}/${photo}`} // Ensure photo is included here
                    alt={title} 
                />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.title}>
                    <h2>{title}</h2>
                </div>
                <div className={styles.category}>
                    <span># <span style={{ color: 'var(--secondary-color)' }}> {category} </span></span>
                </div>
                <div className={styles.description}>
                    {description?.slice(0, 100)}...
                </div>
                <div className={styles.time}>
                    <span>Created {moment(createdAt).fromNow()}</span>
                    <span><TbWriting /> {author}</span>
                </div>
                <Button variant="outlined" onClick={handleLike} color="primary">
                    👍 {likeCount}
                </Button>
            </div>
        </div>
    );
};

export default BlogCard;
