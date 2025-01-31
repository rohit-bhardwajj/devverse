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
    const [likedArticles, setLikedArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const getLikedArticles = async () => {
        try {
            setProgress(40);
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/blog/liked-blogs`,
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );
            setProgress(80);
            setLikedArticles(data);
            setProgress(100);
            setLoading(false);
        } catch (error) {
            console.log(error.response);
            setLoading(false);
        }
    };

    useEffect(() => {
        getLikedArticles();
    }, []);

    return (
        <Layout>
            <div className={styles.BlogPageWrapper}>
                <h1>Liked Articles By {auth?.user?.name}</h1>
                {loading ? (
                    <div><LoadingScreen /></div>
                ) : likedArticles.length === 0 ? (
                    <div className={styles.empty}>You have not liked any articles yet.</div>
                ) : (
                    likedArticles.map((b) => (
                        <BlogCard
                            key={b.blogs._id}
                            id={b.blogs._id}
                            title={b.blogs.title}
                            slug={b.blogs.slug}
                            description={b.blogs.description}
                            category={b.blogs.category}
                            createdAt={b.blogs.createdAt}
                        />

                    ))
                )}
            </div>
        </Layout>
    );
};

export default LikedPage;
