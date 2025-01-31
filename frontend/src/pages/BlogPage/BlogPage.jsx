import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './BlogPage.module.css';
import BlogContent from '../../components/BlogContent/BlogContent';
import moment from 'moment';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useAuth } from '../../context/authContext';
import { toast } from 'react-toastify';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SliderCard from '../../components/BlogCard/SliderCard/SliderCard'
const BlogPage = () => {
    const [auth, setAuth] = useAuth();
    const [blog, setBlog] = useState([]);
    const { slug } = useParams();
    const [likes, setLikes] = useState('');
    const [liked, setLiked] = useState(false);
    const [likeProcessing, setLikeProcessing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    const responsiveCard = {
        desktop: {
            breakpoint: { max: 3000, min: 1500 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1500, min: 800 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 800, min: 600 },
            items: 2
        },
        smobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1
        }
    };

    const getBlog = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/blog/get-blog/${slug}`);
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
            setBlog(data?.blog);
            setLikes(data?.totalLikes);
            getRelatedBlogs(data?.blog?._id, data?.blog?.category?._id)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    };

    const checkLikedStatus = async () => {
        if (auth?.user && blog?._id) {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/api/v1/blog/check-blog-liked/${blog._id}`,
                    {
                        headers: {
                            Authorization: auth?.token,
                        },
                    }
                );
                setLiked(response.data.liked);

            } catch (error) {
                console.log(error);
            }
        }
    };
    const getRelatedBlogs = async (pid, cid) => {
        try {
            const { data } = await axios.get(
                `${process.env.REACT_APP_API}/api/v1/blog/related-blogs/${pid}/${cid}`
            );
            setRelatedBlogs(data?.blogs);

        } catch (error) {
            console.log(error);

        }
    };
    useEffect(() => {
        getBlog();

    }, [slug]);

    useEffect(() => {
        checkLikedStatus();
    }, [auth, blog?._id]);

    const handleLike = async () => {
        if (!auth?.user) {
            toast.error('Login To Like');
            return;
        }

        if (likeProcessing) {
            // If the like button is already being processed, prevent multiple clicks
            return;
        }

        try {
            setLikeProcessing(true);
            setLiked(!liked);
            if (liked) {
                setLikes((prev) => prev - 1);
            } else {
                setLikes((prev) => prev + 1);
            }
            const { data } = await axios.post(
                `${process.env.REACT_APP_API}/api/v1/blog/like-blog/${blog?._id}`,
                {}, // Empty request data
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );

        } catch (error) {
            console.log(error.response);
        } finally {
            setLikeProcessing(false);
        }
    };
    return (
        <Layout
            title={blog?.title}
            description={blog?.description}
            slug={blog?.slug}
            id={blog?._id}
            type="article"
        >
            {
                loading ? (
                    <div><LoadingScreen /></div>
                ) : (
                    <>
                        <div className={styles.blogDetailContainer} >
                            <img
                                className={styles.blogImage}
                                src={`${process.env.REACT_APP_API}/api/v1/blog/blog-photo/${blog._id}`}
                                alt={blog.title}
                            />
                            <h1 className={styles.blogTitle}>{blog.title}</h1>
                            <BlogContent content={blog.content} />
                            <div className={styles.others}>
                                <div className={styles.blogLike}>
                                    <button onClick={handleLike} className={styles.likeButton}>
                                        {liked ? <AiFillHeart style={{ fontSize: '2rem' }} /> : <AiOutlineHeart style={{ fontSize: '2rem' }} />}
                                        <span>{likes} likes</span>
                                    </button>
                                </div>
                                <div className={styles.blogInfo}>
                                    <span className={styles.blogDate}>{moment(blog?.createdAt).fromNow()} by Rohit</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.relatedBlogslider}>
                            <h2>Related Blogs</h2>
                            <Carousel responsive={responsiveCard}>
                                {relatedBlogs?.map((b) => (
                                    <SliderCard key={b._id} id={b._id} title={b.title} slug={b.slug} createdAt={b.createdAt} />
                                ))}
                            </Carousel>
                        </div>
                    </>
                )
            }

        </Layout >
    );
};

export default BlogPage;
