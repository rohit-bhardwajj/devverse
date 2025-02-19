import React, { useEffect, useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import styles from "./LikedPage.module.css";
import axios from 'axios';
import BlogCard from '../../../components/BlogCard/BlogCard';
import { useAuth } from '../../../context/authContext';
import { useProgress } from '../../../context/topLoaderProgress';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

const LikedPage = () => {
    const [auth, setAuth] = useAuth();
    const [progress, setProgress] = useProgress();
    const [likedBlogs, setLikedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    const getLikedBlogs = async () => {
        try {
            setProgress(40);
            const { data } = await axios.get(
                `/api/v1/blogs/get-liked-blogs`,
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );
            setProgress(80);
            setLikedBlogs(data.likedBlogs);
            console.log("are liked blogs ",data.likedBlogs);
            
            setProgress(100);
            setLoading(false);
        } catch (error) {
            console.log(error.response);
            setLoading(false);
        }
    };

    useEffect(() => {
        getLikedBlogs();
    }, []);

    return (
        <Layout>
            <div className={styles.BlogPageWrapper}>
                <h1>Liked Blogs By {auth?.user?.name}</h1>
                {loading ? (
                    <div><LoadingScreen /></div>
                ) : likedBlogs.length === 0 ? (
                    <div className={styles.empty}>You have not liked any Blogs yet.</div>
                ) : (
                    likedBlogs.map((b) => (
                        <BlogCard
                            key={b.blog._id}
                            id={b.blog._id}
                            title={b.blog.title}
                            slug={b.blog.slug}
                            description={b.blog.description}
                            category={b.blog.category.name}
                            createdAt={b.blog.createdAt}
                        />

                    ))
                )}
            </div>
        </Layout>
    );
};

export default LikedPage;
