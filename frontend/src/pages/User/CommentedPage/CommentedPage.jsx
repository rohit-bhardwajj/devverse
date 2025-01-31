import React from 'react'
import styles from "./CommentedPage.module.css"
import Layout from '../../../components/Layout/Layout'
import UserMenu from '../../../components/Layout/UserMenu/UserMenu'
const CommentedPage = () => {
    return (
        <Layout>
            <div className={styles.container}>
                <UserMenu />
                <div className={styles.content}>
                    <h2>Comments</h2>
                </div>
            </div>
        </Layout>
    )
}

export default CommentedPage