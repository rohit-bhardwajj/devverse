import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = ({ children, title, description, keywords, author, headerBg, slug, id, type }) => {
    const defaultTitle = 'Questify - Explore Now';
    const defaultDescription = 'quesitfy - explore knowledge';

    if (id) {
        var image = `https://www.questify.site/api/v1/blog/blog-photo/${id}`
        //  https://www.questify.site/api/v1/blog/blog-photo/652a1b3386ffc1e060a32870
    } else {
        var image = "https://www.questify.site/logoT.png"
    }
    if (slug) {
        var url = `https://questify.site/blog/${slug}`;
    } else {
        var url = "https://questify.site";
    }

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <meta name="description" content={description || defaultDescription} />
                <meta name="keywords" content={keywords} />
                <meta name='author' content={author} />
                <meta property="og:type" content={type}></meta>
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={url} />
                <meta property="og:site_name" content="Questify | Explore Now"></meta>
                {/* <meta property="og:image" content={`https://www.questify.site/api/v1/blog/blog-photo-direct/${id}`} /> */}
                <meta property="og:image" content={`https://www.questify.site/api/v1/blog/blog-photo-direct/${id}`} />
                <meta name="google-adsense-account" content="ca-pub-1706232639182146" />
                <meta name="robots" content="index, follow" />
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1706232639182146"
                    crossorigin="anonymous"></script>
                <title>{title || defaultTitle}</title>
            </Helmet>
            <Header headerBg={headerBg} />
            <main style={{ minHeight: '69vh' }}>
                {children}
            </main>
            <Footer />
        </>
    );
};

Layout.defaultProps = {

    keywords: 'questify, curious, know, blog, rohit',
    author: "Rohit",
    title: 'Questify',
    description: "Discover blog posts on variety of topics and expand your knowledge",
    type: "website"
};

export default Layout;
