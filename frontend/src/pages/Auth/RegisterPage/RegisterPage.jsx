import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './RegisterPage.module.css';
import Layout from '../../../components/Layout/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useProgress } from '../../../context/topLoaderProgress';
const RegisterPage = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useProgress()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [phone, setPhone] = useState('');
    const [favbook, setfavBook] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setProgress(40)
            const res = await axios.post(`/api/v1/users/register`, { name, email, password , favbook });
            setProgress(80)
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
            else {
                toast.error(res.data.message)
                console.log("first")
            }
            setProgress(100)
        } catch (error) {
            toast.error("something went wrong");
            console.log(error)
        }
    }

    return (
        <Layout>
            <div className={styles.registerContainer}>
                <h1>Create an Account</h1>
                <form onSubmit={handleSubmit} className={styles.registerForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required />
                    </div>
                    {/* <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone No</label>
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" id="phone" name="phone" pattern="[0-9]{10}" required />
                    </div> */}
                    <div className={styles.formGroup}>
                        <label htmlFor="book">What is your favourite Book ?</label>
                        <input  placeholder='eg. Atomic-habits' value={favbook} onChange={(e) => setfavBook(e.target.value)} type="text" id="favbook" name="favbook" required />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <p className={styles.authLink}>Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </Layout>
    );
};

export default RegisterPage;
