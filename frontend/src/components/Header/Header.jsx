import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { HiMenu } from "react-icons/hi";
import { AiOutlineUser, AiOutlineClose } from "react-icons/ai";
import { useAuth } from '../../context/AuthContext';

// Header.js
const Header = ({ headerBg }) => {
    const { auth, login, logout } = useAuth(); // Destructure new properties
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
    };

    return (
        <header style={{ backgroundColor: headerBg }} className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <img src="/public/Devverse logo.png" alt="questify Logo" className={styles.logoImage} />
                </div>
                <nav className={`${styles.nav} ${isMenuOpen ? styles.showMenu : ''}`}>
                    <NavLink exact="true" activeclassname="active" to="/">Home</NavLink>
                    <NavLink exact="true" activeclassname="active" to="/all-blogs">All Articles</NavLink>
                    {!auth.isAuthenticated ? (
                        <>
                            <NavLink exact="true" activeclassname="active" to="/register">Register</NavLink>
                            <NavLink exact="true" activeclassname="active" to="/login">Login</NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink exact="true" activeclassname="active" to="/user/liked-articles">Liked Articles</NavLink>
                            <NavLink exact="true" activeclassname="active" to="/user/dashboard">
                                {auth.user?.name} <AiOutlineUser style={{ fontSize: "20px" }} />
                            </NavLink>
                            <button onClick={logout}>Logout</button>
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