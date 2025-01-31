import React, { useState } from 'react';
import Layout from '../../../components/Layout/Layout';
import styles from './LoginPage.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth(); // Destructure setAuth from useAuth

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/users/login`, { email, password });
            if (res?.data?.success) {
                setAuth({ user: res?.data?.user, token: res?.data?.token });
                // state is changed after completion of api call 
                localStorage.setItem('auth', JSON.stringify({ user: res?.data?.user, token: res?.data?.token }));
                navigate(location.state || "/");
                toast.success(res?.data?.message);
            } else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.message);
        }
    }

    return (
        <Layout>
            <div className={styles.loginContainer}>
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className={styles.loginForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p className={styles.authLink}>
                    Don't have an account? <Link to="/register">Register here</Link>.
                </p>
                <p className={styles.authLink}>
                    Forgot Password? <Link to="/forget-password">Change here</Link>.
                </p>
            </div>
        </Layout>
    )
}

export default LoginPage;
