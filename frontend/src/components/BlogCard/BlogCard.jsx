import React, { useState,useEffect } from 'react';
import styles from './BlogCard.module.css';
import moment from 'moment'
import axios from 'axios';
import { TbWriting } from "react-icons/tb";
import { Link } from 'react-router-dom';

const BlogCard = ({ id, title, slug, description, category, createdAt }) => {
    // console.log(createdAt);
    const [blogImage,SetBlogImage]=useState(null);
    const getBlogImage = async()=>{
        try{
            const response = await axios.get(`/api/v1/blogs/blog-image/${id}`);
            SetBlogImage(response.data);
            
        }
        catch (error) {
            console.log(error);
        }
    }
    // const BlogImage = `http://localhost:5000/api/v1/blogs/blog-image/${id}`
    useEffect(() => {
            getBlogImage();
        }, []);
    return (

        <Link to={`/blog/${slug}`} className={styles.card}>
            <div className={styles.imageWrapper}>
            
                <img className={styles.image} 
                // src={BlogImage} alt={title} />
                src={blogImage} alt={title} />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.title}>
                    <h2>{title}</h2>
                </div>
                <div className={styles.category}>
                    <span># <span style={{ color: 'var(--secondary-color)' }}> {category} </span></span>
                </div>
                <div className={styles.description}>
                    {description?.slice(0, 100)}
                </div>
                <div className={styles.time}>
                
                    <span>created {moment(createdAt).fromNow()}</span>
                    <span> <TbWriting />Rohit Bhardwaj</span>
                </div>
            </div>
        </Link>
    )
};

export default BlogCard;
