import React from 'react'
import Layout from '../../../components/Layout/Layout'
import styles from './ForgetPasswordPage.module.css';
import { Link } from 'react-router-dom';
const ForgetPasswordPage = () => {
    return (
        <Layout>
            <div className={styles.loginContainer}>
                <h1>Login</h1>
                <form className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="book">What is your favourite Book ?</label>
                        <input type="text" id="book" name="book" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="newpassword">New Password</label>
                        <input type="password" id="newpassword" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p className={styles.authLink}>
                    Don't have an account? <Link to="/register">Register here</Link>.
                </p>
            </div>


        </Layout>
    )
}

export default ForgetPasswordPage