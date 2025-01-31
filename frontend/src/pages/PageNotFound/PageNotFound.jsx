import React from 'react'
import Layout from '../../components/Layout/Layout'
import styles from "./PageNotFound.module.css"
import { Link } from 'react-router-dom'

const PageNotFound = ({ title, desc, code, link }) => {
    return (
        <Layout>
            <div className={styles.container}>
                <h1>{code}</h1>
                <h3>{title}</h3>
                <Link to={link}>{desc}</Link>
            </div>
        </Layout>
    )
}

PageNotFound.defaultProps = {
    code: 404,
    title: 'Page Not Found',
    desc: "Go To Home Page",
    link: "/"
};

export default PageNotFound
