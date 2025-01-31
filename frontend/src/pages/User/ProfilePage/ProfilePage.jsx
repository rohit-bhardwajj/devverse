import React from 'react'
import Layout from '../../../components/Layout/Layout'
import styles from "./ProfilePage.module.css";
import UserMenu from '../../../components/Layout/UserMenu/UserMenu';
import { useAuth } from '../../../context/authContext';
import { useProgress } from '../../../context/topLoaderProgress';
const ProfilePage = () => {

    const [auth, setAuth] = useAuth();
    const [progress, setProgress] = useProgress()
    return (
        <Layout>
            <div className={styles.container}>
                <UserMenu />
                <div className={styles.content}>
                    {/* <div className={styles.container} style={{ marginTop: "15px!important" }}> */}
                    <h2 className="text-body-secondary">Welcome {auth?.user?.name}</h2>
                    <h3 className="text-body-secondary">Email: <span>{auth?.user?.email}</span></h3>
                    <h3 className="text-body-secondary">phone No: <span>{auth?.user?.phone}</span></h3>
                </div>
                {/* </div> */}
            </div>
        </Layout>
    )
}

export default ProfilePage