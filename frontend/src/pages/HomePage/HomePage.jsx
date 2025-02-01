import React, { useEffect, useLayoutEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import styles from "./HomePage.module.css"
import { Link } from 'react-router-dom'
import { Typewriter } from 'react-simple-typewriter'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import sliderCard from '../../components/BlogCard/SliderCard/SliderCard';
import axios from 'axios'
import { useProgress } from '../../context/topLoaderProgress'
import SliderCard from '../../components/BlogCard/SliderCard/SliderCard'
import { useAuth } from '../../context/authContext'
const HomePage = () => {

    const [progress, setProgress] = useProgress()
    const [headerBgColor, setHeaderBgColor] = useState('');
    const [latestBlogs, setlatestBlogs] = useState([]);
    const [likedArticles, setLikedArticles] = useState([]);
    const [auth, setAuth] = useAuth()
    useLayoutEffect(() => {
        const handleScroll = () => {
            const headerBgColor = window.scrollY > 5 ? ' #F0F0F0' : ' #09416a38';
            setHeaderBgColor(headerBgColor);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
    }, []);
    const responsiveCard = {
        desktop: {
            breakpoint: { max: 3000, min: 1500 },
            items: 4,
        },
        tablet: {
            breakpoint: { max: 1500, min: 800 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 800, min: 600 },
            items: 3
        },
        smobile: {
            breakpoint: { max: 600, min: 0 },
            items: 1
        }
    };
    const getLatestBlogs = async () => {
        try {
            setProgress(40)
            const {data} = await axios.get(`/api/v1/blogs/get-latest-blogs`);
            setProgress(80)
            setlatestBlogs(data.latestBlogs)
            console.log("Here are blogs " + data.latestBlogs);
            
            setProgress(100)
        } catch (error) {
            console.log(error);
        }
    };

    // const getLikedArticles = async () => {
    //     try {
    //         const { data } = await axios.get(
    //             `/api/v1/blog/liked-blogs`,
    //             {
    //                 headers: {
    //                     Authorization: auth?.token,
    //                 },
    //             }
    //         );
    //         setLikedArticles(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        getLatestBlogs()
        // getLikedArticles()
    }, [])
    latestBlogs ? console.log(latestBlogs) : console.log("first")
    return (
        <Layout title={"Devverse"} headerBg={headerBgColor} >
            <div className={styles.home}></div>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heading}>
                    <h1 className=' font-extrabold'>Devverse</h1>
                    <h1 className=' font-bold' >Devverse</h1>
                </div>


                <h2 className={styles.animateCharcter}>
                    {/* Style will be inherited from the parent element */}
                    <Typewriter
                        words={['Uncover Knowledge', 'Discover Wisdom', 'Explore Learning', 'Grasp Insight', 'Learn and Grow']}
                        cursor
                        loop={10}
                        cursorStyle='|'
                        cursorBlinking='false'
                        typeSpeed={100}
                        deleteSpeed={60}
                        delaySpeed={1000}
                    />
                </h2>


                <div className={styles.container}>
                    <p>Explore the world of knowledge and learning.</p>
                    <Link to="/all-blogs" className={styles.heroButton}>Read Articles</Link>
                </div>
            </section>

            <section id="blog" className={styles.blog}>
                <div className={styles.container}>
                    <h2>Latest Blogs</h2>
                    {latestBlogs.length === 0 ? (
                        <p>Loading...</p>
                    ) : (
                        <Carousel responsive={responsiveCard}>
                            {latestBlogs?.map((b) => (
                                <SliderCard key={b._id} id={b._id} title={b.title} slug={b.slug} createdAt={b.createdAt} />
                            ))}
                        </Carousel>
                    )} 
                </div>

            </section>

        </Layout >
    )
}

export default HomePage