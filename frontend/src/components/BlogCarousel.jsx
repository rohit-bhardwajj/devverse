import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import BlogCard from './BlogCard/BlogCard'; // Adjust the import path if necessary
import Loader from './loader'; // Import the Loader component

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/';

const BlogCarousel = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs`);
        const data = await response.json();
        setBlogs(Array.isArray(data) ? data : []); // Ensure it's an array
      } catch (err) {
        setError('Error fetching blogs');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false); // Stop the loader
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <Loader />; // Show loader during fetch
  if (error) return <div className="text-red-500">{error}</div>; // Display error message

  if (blogs.length === 0) {
    return <p className="text-gray-500">No blogs available for display.</p>; // Handle empty response
  }

  return (
    <Swiper spaceBetween={30} slidesPerView={3} autoplay={{ delay: 3000 }}>
      {blogs.map((blog) => (
        <SwiperSlide key={blog._id}>
          <BlogCard
                            key={blog._id}
                            id={blog._id}
                            title={blog.title}
                            slug={blog.slug}
                            description={blog.content}
                            isliked={blog.isLiked}
                            likes={blog.likes}
                            category={blog.category}
                            createdAt={blog.createdAt}
                            author={blog.author?.username || 'Unknown'}
                            photo={blog.photo} // Add photo prop here
                        />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BlogCarousel;
