import React from 'react'
import styles from "./UserMenu.module.css";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { toast } from 'react-toastify';
const UserMenu = () => {
    const [auth, setAuth] = useAuth()


    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: "", });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };
    return (
        <div className={styles.menu}>

            {/* <NavLink exact='true' activeclassname="active" to="/user/dashboard" className={styles.menuLink}>
                <button className={styles.menuButton}>Dashboard</button>
            </NavLink> */}

            <NavLink exact='true' activeclassname="active" to="/user/update-profile" className={styles.menuLink}>
                <button className={styles.menuButton}>Update Profile</button>
            </NavLink>


            <NavLink exact='true' activeclassname="active" to="/user/liked-articles" className={styles.menuLink}>
                <button className={styles.menuButton}>Liked Articles</button>
            </NavLink>

            {/* <NavLink exact='true' activeclassname="active" to="/user/commented-post" className={styles.menuLink}>
                <button className={styles.menuButton}>Commented Post</button>
            </NavLink> */}


            <NavLink onClick={handleLogout} exact='true' activeclassname="active" to="/login" className={styles.menuLink}>
                <button className={styles.menuButton}>Log Out</button>
            </NavLink>


        </div>
    )
}

export default UserMenu