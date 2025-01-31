import React from 'react';
import styles from './sliderCard.module.css';
import moment from 'moment'
import { useEffect } from 'react';
import axios from 'axios';
import { TbWriting } from "react-icons/tb";
import { Link } from 'react-router-dom';
const SliderCard = ({ id, title, slug, description, category, createdAt}) => {
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
    useEffect(() => {
            getBlogImage();
        }, []);
    return (
        <Link to={`/blog/${slug}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <img className={styles.image} src={blogImage} alt={title} />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.title}>
                    <h2>{title}</h2>
                </div>
                <div className={styles.time}>
                    <span>{moment(createdAt).fromNow()}</span>
                    <span> <TbWriting /> Rohit Bhardwaj</span>
                </div>
            </div>
        </Link>
    )
}

export default SliderCard