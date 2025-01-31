import React from 'react';
import styles from './BlogCard.module.css'; 
import { TbEdit } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/authContext';

const AdminBlogCard = ({ id, title, slug, description, category, createdAt }) => {

    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    //delete a product 
    const handleDelete = async () => {
        try {
            let answer = window.prompt("Are You Sure want to delete this product ? ");
            if (!answer) return;
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/blog/delete-blog/${id}`, {
                headers: {
                    Authorization: auth?.token
                }
            });
            toast.success("Product Deleted Succfully");
            navigate("/admin/allblogs");
        } catch (error) {

            toast.error("Something went wrong");
        }
    };

    return (

        <Link to={`/blog/${slug}`} className={styles.card}>
            <img className={styles.image} src={`${process.env.REACT_APP_API}/api/v1/blog/blog-photo/${id}`} alt={title} />

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
                    <Link to={`/admin/update-blog/${slug}`}> <TbEdit className={styles.edit} /></Link>
                    <Link onClick={handleDelete}> <MdDeleteOutline className={styles.delete} /> </Link>
                </div>
            </div>
        </Link>
    )
};

export default AdminBlogCard;
