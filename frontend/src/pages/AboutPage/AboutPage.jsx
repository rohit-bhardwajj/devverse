import React from 'react';
import styles from './AboutPage.module.css'; // Import the CSS Module for styling
import Layout from '../../components/Layout/Layout';

const About = () => {
    return (
        //         <meta charSet='utf-8' />
        // <meta name="viewport" content="width=device-width, initial-scale=1" />
        // <meta name="description" content={description} />
        // <meta name="keywords" content={keywords} />
        // <meta name='author' content={author} />
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.heading}>About  <span style={{ color: 'var(--secondary-color)', fontWeight: 'bold', fontSize: 'inherit' }}>Q</span>uestify</h1>
                <div className={styles.content}>
                    <h3 className={styles.subheading}>Our Mission</h3>
                    <p>
                        Questify is a versatile blogging platform where you can find a wide range of articles covering various topics from technology to lifestyle and more.
                    </p>

                    <h3 className={styles.subheading}>Our Vision</h3>
                    <p>
                        Our platform aims to provide a hub for knowledge seekers and creators to connect, share ideas, and learn from each other.
                    </p>

                    <h3 className={styles.subheading}>User-Friendly Experience</h3>
                    <p>
                        At Questify, we believe in the power of knowledge-sharing and the impact it can have on shaping a better tomorrow. We strive to make learning accessible and enjoyable by offering a user-friendly interface and a seamless browsing experience.
                    </p>

                    <h3 className={styles.subheading}>Your Feedback Matters</h3>
                    <p>
                        We are continuously improving and expanding Questify to meet the needs of our growing user base. If you have any feedback or suggestions, we'd love to hear from you! Feel free to contact us.
                    </p>


                    <h3 className={styles.subheading}>Gratitude and Impact</h3>
                    <p>
                        Thank you for being a part of Questify. Together, let's explore, learn, and make a positive impact with our shared knowledge!
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default About;
