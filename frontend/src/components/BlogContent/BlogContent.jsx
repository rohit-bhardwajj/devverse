import React from 'react';
import styles from "./BlogContent.module.css"

const BlogContent = ({ content }) => {
    return <div className={styles.blogContent} dangerouslySetInnerHTML={{ __html: content }} />;
};

export default BlogContent;
