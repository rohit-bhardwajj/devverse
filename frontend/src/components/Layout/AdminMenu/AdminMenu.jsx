import React from 'react'
import styles from "./AdminMenu.module.css"
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { toast } from 'react-toastify';
const AdminMenu = () => {
    const [auth, setAuth] = useAuth()


    const handleLogout = () => {
        setAuth({ ...auth, user: null, token: "", });
        localStorage.removeItem("auth");
        toast.success("Logout Successfully");
    };
    return (
        <div className={styles.menu}>

            <NavLink exact='true' activeclassname="active" to="/admin/allblogs" className={styles.menuLink}>
                <button className={styles.menuButton}>All Blogs</button>
            </NavLink>

            <NavLink exact='true' activeclassname="active" to="/admin/manage-categories" className={styles.menuLink}>
                <button className={styles.menuButton}>Categories</button>
            </NavLink>


            {/* <NavLink exact='true' activeclassname="active" to="/admin/update-blog" className={styles.menuLink}>
                <button className={styles.menuButton}>Update Blogs</button>
            </NavLink> */}

            <NavLink exact='true' activeclassname="active" to="/admin/create-blog" className={styles.menuLink}>
                <button className={styles.menuButton}>Create Blog</button>
            </NavLink>

            <NavLink onClick={handleLogout} exact='true' activeclassname="active" to="/login" className={styles.menuLink}>
                <button className={styles.menuButton}>Log Out</button>
            </NavLink>


        </div>
    )
}

export default AdminMenu