import React from 'react'
import Layout from '../../../components/Layout/Layout'
import styles from "./AdminProfilePage.module.css"
import AdminMenu from '../../../components/Layout/AdminMenu/AdminMenu'
import { useAuth } from '../../../context/authContext'
const AdminProfilePage = () => {

    const [auth, setAuth] = useAuth();
    return (
        <Layout>
            <div className={styles.container}>
                <AdminMenu />
                <div className={styles.content}>
                    <div className={styles.container} style={{ marginTop: "15px!important" }}>
                        <div className="card p-3">
                            <h4><small className="text-body-secondary"> Admin Name :</small>{auth?.user?.name}</h4>
                            <h4><small className="text-body-secondary">Admin Email : </small>{auth?.user?.email}</h4>
                            <h4><small className="text-body-secondary">Admin Contact : </small>{auth?.user?.phone}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminProfilePage