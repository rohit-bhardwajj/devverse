// Header.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'; // Import the CSS Module
import { HiMenu } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from '../../../context/authContext';

const Header = ({ headerBg }) => {
    const [auth] = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    };

    return (
        <header style={{ backgroundColor: headerBg }}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <img src="/DevverseLogo.png" alt="Devverse Logo" className={styles.logoImage  }  />
                </div>
                <nav className={`${styles.nav} ${isMenuOpen ? styles.showMenu : ''}`} >
                    <NavLink exact="true" activeclassname="active" to="/">Home</NavLink>
                    <NavLink exact="true" activeclassname="active" to="/all-blogs">All Blogs</NavLink>
                    {!auth?.user ? (
                        <>
                            <NavLink exact="true" activeclassname="active" to="/register">Register</NavLink>
                            <NavLink exact="true" activeclassname="active" to="/login">Login</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink exact="true" activeclassname="active" to="/user/liked-articles">Liked Blogs</NavLink>
                            <NavLink style={{ display: 'flex', alignItems: 'center' }} exact="true" activeclassname="active" to="/user/dashboard">{auth.user.name}<AiOutlineUser style={{ fontSize: "20px" }} /></NavLink>
                        </>
                    )
                    }
                </nav >
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <HiMenu className={`${styles.mobileMenu} ${!(isMenuOpen) ? styles.showMenu : ''}`} />
                    <AiOutlineClose className={`${styles.mobileMenu} ${isMenuOpen ? styles.showMenu : ''}`} />
                </div>
            </div>
        </header>
    )
};
export default Header;




