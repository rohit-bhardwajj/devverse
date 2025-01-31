import React, { useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import styles from './ContactPage.module.css';
import { toast } from 'react-toastify';
import { useProgress } from '../../context/topLoaderProgress';

const ContactPage = () => {

    const [progress, setProgress] = useProgress()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setProgress(40);
            await axios.post(`${process.env.REACT_APP_API}/api/v1/contact/create-comment`, formData);
            setProgress(80);
            toast.success('Thank you for your message! We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                message: '',
            });
            setProgress(100);
        } catch (error) {
            console.log(error.response);
            alert('Failed to submit the form. Please try again later.');
        }
    };

    return (
        <Layout>

            <div className={styles.contactForm}>
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default ContactPage;
