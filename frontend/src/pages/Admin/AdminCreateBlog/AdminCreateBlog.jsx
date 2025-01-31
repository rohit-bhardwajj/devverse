import React from 'react'
import Layout from '../../../components/Layout/Layout'
import styles from "./AdminCreateBlog.module.css"
import AdminMenu from '../../../components/Layout/AdminMenu/AdminMenu'
import CreateBlog from '../../../components/CreateBlog/CreateBlog'

const AdminCreateBlog = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <AdminMenu />
                <div className={styles.content}>
                    <CreateBlog />
                </div>
            </div>
        </Layout>
    )
}
export default AdminCreateBlog 