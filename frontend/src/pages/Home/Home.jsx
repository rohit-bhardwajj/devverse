import React, { useEffect, useLayoutEffect, useState } from 'react'
// import BlogList from '../../components/AllBlogs/BlogList'; // Adjust the path as necessary
import Header from '../../components/Header/Header';
import styles from "./Home.module.css"
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import {useAuth} from '../../context/AuthContext'
import BlogCarousel from '../../components/BlogCarousel'; // Adjust the path if necessary
import '../../index.css'
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
    const {auth} =useAuth();
    const [headerBgColor, setHeaderBgColor] = useState('');
    const [loading, setLoading] = useState(true);
    const [key, setKey] = useState(0);

const forceUpdate = () => {
    setKey((prevKey) => prevKey + 1);
};
useEffect(() => {
    const handleAuthChange = () => {
        forceUpdate();
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
        window.removeEventListener('authChange', handleAuthChange);
    };
}, []);


    useLayoutEffect(() => {
        const handleScroll = () => {
            const headerBgColor = window.scrollY > 5 ? ' #F0F0F0' : ' #09416a38';
            setHeaderBgColor(headerBgColor);
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll);
    }, []);

    return (
        <div>
            <Header headerBg={headerBgColor} key={key} />

            <div title={""} >
                <div className={styles.home}></div>

                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heading}>
                        <h1 className=' font-extrabold'>DEVVERSE</h1>
                        <h1 className=' font-extrabold'>DEVVERSE</h1>
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
                        <nav to="/all-blogs" className={styles.heroButton}>Read Articles</nav>
                    </div>

                </section>
            </div >
            <section className={styles.carouselSection}>
                <h2 className="text-2xl font-bold text-center my-8">Featured Blogs</h2>
                <BlogCarousel />
            </section>

        </div>
    );
};

export default Home;
