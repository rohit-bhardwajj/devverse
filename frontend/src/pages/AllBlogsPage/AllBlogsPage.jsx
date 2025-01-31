import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import styles from "./AllBlogsPage.module.css";
import axios from 'axios';
import BlogCard from '../../components/BlogCard/BlogCard';
import { useProgress } from '../../context/topLoaderProgress';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

const AllBlogsPage = () => {
    const [progress, setProgress] = useProgress();
    const [loading, setLoading] = useState(true); // Initialize loading state to true
    const [blogs, setBlogs] = useState([]);

    const getAllBlogs = async () => {
        try {
            setProgress(40);
            const response = await axios.get(`/api/v1/blogs/all-blogs`);
            setProgress(80);
            if (response.data?.success) {
                console.log(response.data.blogs)
                setBlogs(response.data?.blogs);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setProgress(100);
            setLoading(false); // Set loading state to false after fetching and updating data
        }
    };

    useEffect(() => {
        getAllBlogs();
    }, []);

    return (
        <Layout>
            <div className={styles.BlogPageWrapper}>
                <h1>All Articles</h1>
                {loading ? (
                    <div><LoadingScreen /></div>
                ) : (
                    blogs.map((b) => (
                        <BlogCard
                            key={b?._id}
                            slug={b?.slug}
                            createdAt={b?.updatedAt}
                            id={b?._id}
                            title={b?.title}
                            description={b?.description}
                            category={b?.category ? b.category.name : "general"}
                        />
                    ))
                )}
            </div>
        </Layout>
    );
};

export default AllBlogsPage;
