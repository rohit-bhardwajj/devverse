// src/components/Header.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import styles from './Header.module.css';
import { HiMenu } from "react-icons/hi";
import { AiOutlineUser, AiOutlineClose } from "react-icons/ai";

const Header = ({ headerBg }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const { auth, setAuth } = useAuth(); // Get auth state and setter from context

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuth(null); // Update auth state after logout
        navigate("/"); // Redirect to home after logout
    };

    return (
        <header style={{ backgroundColor: headerBg }}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <img src="/logoT.png" alt="DevVerse Logo" className={styles.logoImage} />
                </div>
                <nav className={`${styles.nav} ${isMenuOpen ? styles.showMenu : ''}`}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/snippetslist">Snippets</NavLink>

                    {auth ? ( // Check if the user is authenticated
                        <>
                            <NavLink to="/likedblogs">Liked Blogs</NavLink>
                            <NavLink to="/user/dashboard">
                                User Profile
                                <AiOutlineUser style={{ fontSize: "20px", marginLeft: "5px" }} />
                            </NavLink>
                            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/register">Register</NavLink>
                            <NavLink to="/login">Login</NavLink>
                        </>
                    )}
                </nav>
                <div className={styles.hamburger} onClick={toggleMenu}>
                    <HiMenu className={`${styles.mobileMenu} ${!isMenuOpen ? styles.showMenu : ''}`} />
                    <AiOutlineClose className={`${styles.mobileMenu} ${isMenuOpen ? styles.showMenu : ''}`} />
                </div>
            </div>
        </header>
    );
};

export default Header;
