import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout/Layout'
import styles from "./UpdateProfile.module.css";
import UserMenu from '../../../components/Layout/UserMenu/UserMenu';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { useProgress } from '../../../context/topLoaderProgress';

const UpdateProfile = () => {
    const [progress, setProgress] = useProgress()
    const [auth, setAuth] = useAuth()

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [answer, setAnswer] = useState('');

    //get user data
    useEffect(() => {
        const { email, name, phone, answer } = auth?.user;
        setName(name);
        setPhone(phone);
        setEmail(email);
        setAnswer(answer);
    }, [auth?.user]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setProgress(40)
            const res = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/update-profile`, { name, password, phone, answer }, {
                headers: {
                    Authorization: auth?.token
                }
            });
            setProgress(80)
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
            else {
                toast.error(res.data.message)
            }
            setProgress(100)
        } catch (error) {
            toast.error("something went wrong");
            console.log(error)
        }
    }



    return (
        <Layout>
            <div className={styles.container}>
                <UserMenu />
                <div className={styles.content}>
                    <div className={styles.registerContainer}>
                        <h1>Update Profile</h1>
                        <form onSubmit={handleSubmit} className={styles.registerForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" required disabled />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="password">Password</label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Phone No</label>
                                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" id="phone" name="phone" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="answer">What is your favourite Movie ?</label>
                                <input value={answer} onChange={(e) => setAnswer(e.target.value)} type="text" id="answer" name="answer" required />
                            </div>
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdateProfile