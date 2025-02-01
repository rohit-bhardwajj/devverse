import React from 'react';
import Layout from '../../components/Layout/Layout';
import styles from './PrivacyPolicyPage.module.css'; // Import the CSS Module for styling

const PrivacyPolicyPage = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <h1 className={styles.heading}>Privacy Policy</h1>
                <div className={styles.content}>
                    <p>
                        Devverse is committed to protect your privacy and ensuring the security of your personal information. This Page describes how we collect, use, and safeguard your data when you use our website and services.
                    </p>

                    <h2 className={styles.subheading}>Information We Collect</h2>
                    <p>
                        When you visit our website, and create an account with us, we may collect your name, email address, and other contact information.
                    </p>

                    <h2 className={styles.subheading}>How We Use Your Information</h2>
                    <p>
                        We use the information we collect to provide and improve our services and personalize your experience  We may also use your information for research purposes to better understand our users and optimize our platform.
                    </p>

                    <h2 className={styles.subheading}>Sharing Your Information</h2>
                    <p>
                        We do not share your personal information to third parties.
                    </p>

                    <h2 className={styles.subheading}>Data Retention</h2>
                    <p>
                        We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected and to comply with legal obligations. If you wish to have your information removed from our database, please contact us, and we will delete your data.
                    </p>

                    <h2 className={styles.subheading}>Security</h2>
                    <p>
                        We implement industry-standard security measures to protect your personal information from unauthorized access.
                        However, no method of data transmission over the internet or electronic storage is entirely secure. We cannot guarantee the absolute security of your data.
                    </p>

                    <h2 className={styles.subheading}>Third-Party Links</h2>
                    <p>
                        Our website may contain links to third-party websites. Please note that we are not responsible for the privacy practices or content of these sites. We encourage you to review the privacy policies of any third-party websites you visit.
                    </p>

                    <h2 className={styles.subheading}>Changes to the Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy Any modifications will be effective after posting the revised policy on our website.
                    </p>

                    <h2 className={styles.subheading}>Contact Us</h2>
                    <p>
                        If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default PrivacyPolicyPage;
