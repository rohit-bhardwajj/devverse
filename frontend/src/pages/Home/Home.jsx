import React, { useEffect, useLayoutEffect, useState } from 'react'
import BlogList from '../../components/AllBlogs/BlogList'; // Adjust the path as necessary
import Header from '../../components/Header/Header';
import styles from "./Home.module.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import '../../index.css'
import {Typewriter} from 'react-simple-typewriter';

const Home = () => {
     
    const [headerBgColor, setHeaderBgColor] = useState('');

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
            <Header headerBg={headerBgColor} />
            
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
                
            <BlogList />
        </div>
    );
};

export default Home;
