import axios from "axios";
import AdminMenu from "../../../components/Layout/AdminMenu/AdminMenu";
import Layout from "../../../components/Layout/Layout";
import styles from "./AdminAllBlogs.module.css";
import React, { useEffect, useState } from "react";
import AdminBlogCard from "../../../components/BlogCard/AdminBlogCard";

const AdminAllBlogs = () => {
    const [setCategories] = useState([]);
    const [blogs, setBlogs] = useState([]);

    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/blog/all-blogs`
            );
            if (data?.success) {
                setBlogs(data?.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllBlogs();
        // eslint-disable-next-line
    }, []);
    return (
        <Layout>
            <div className={styles.container}>
                <AdminMenu />
                <div className={styles.content}>
                    <h1>All Articles</h1>
                    {blogs.map((b) => (
                        <AdminBlogCard
                            key={b?._id}
                            slug={b?.slug}
                            createAt={b?.createAt}
                            id={b?._id}
                            title={b?.title}
                            description={b?.description}
                            category={b?.category ? b.category.name : "general"}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default AdminAllBlogs;
