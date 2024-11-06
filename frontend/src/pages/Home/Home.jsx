import React, { useEffect, useLayoutEffect, useState } from 'react'
import BlogList from '../../components/AllBlogs/BlogList'; // Adjust the path as necessary
import Header from '../../components/Header/Header';
import styles from "./Home.module.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
            <Header/>
            <h2>Welcome to DevVerse</h2>
            {/* <div className={styles.heading}>
                    <h1>QUESTIFY</h1>
                    <h1>QUESTIFY</h1>
                </div> */}
                
            <BlogList />
        </div>
    );
};

export default Home;
