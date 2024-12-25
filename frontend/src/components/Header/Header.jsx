import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { HiMenu } from "react-icons/hi";
import { AiOutlineUser, AiOutlineClose } from "react-icons/ai";
import { useAuth } from '../../context/AuthContext';  // Import useAuth directly

const Header = ({ headerBg }) => {
    const { auth, logout } = useAuth();  // Use auth directly inside Header
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    };
    console.log("Auth State:", auth);


    return (
        <header style={{ backgroundColor: headerBg }} className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <img src="/DevverseLogo.png" alt="Devverse Logo" className={styles.logoImage} />
                </div>
                <nav className={`${styles.nav} ${isMenuOpen ? styles.showMenu : ''}`}>
                    <NavLink exact="true" activeclassname="active" to="/" className={styles.navLink}>Home</NavLink>
                    <NavLink exact="true" activeclassname="active" to="/allblogs" className={styles.navLink}>All Blogs</NavLink>
                    {!auth.isAuthenticated ? (
                        <>
                            <NavLink exact="true" activeclassname="active" to="/register" className={styles.navLink}>Register</NavLink>
                            <NavLink exact="true" activeclassname="active" to="/login" className={styles.navLink}>Login</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink exact="true" activeclassname="active" to="/user/liked-blogs" className={styles.navLink}>Liked Blogs</NavLink>
                            <NavLink className={styles.navLink} onClick={logout}>Logout</NavLink>
                        </>
                    )}
                </nav>
                <div className={styles.hamburger} onClick={toggleMenu}>
                    {isMenuOpen ? <AiOutlineClose /> : <HiMenu />}
                </div>
            </div>
        </header>
    );
};

export default Header;
