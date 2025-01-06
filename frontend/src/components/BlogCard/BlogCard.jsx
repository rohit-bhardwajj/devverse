import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { TbWriting } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FcLikePlaceholder, FcLike } from "react-icons/fc";

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/';
// const apiUrl =  'http://localhost:5000/';

const BlogCard = ({ id, title, slug, description, category, createdAt, author, isliked, likes = 0, photo }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(likes);

    // Check if the blog is liked by the user when the component mounts
    useEffect(() => {
        const checkLikeStatus = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                const response = await axios.get('/api/blogs/liked-blogs', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const likedBlogs = response.data;
                const isBlogLiked = likedBlogs.some(blog => blog._id === id);
                // const isBlogLiked = likedBlogs.some(blog => blog.id === id);
                setIsLiked(isBlogLiked);
            } catch (error) {
                console.error('Error fetching liked blogs:', error);
            }
        };
        checkLikeStatus();
    }, [id, apiUrl]);

    const handleLike = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('Please log in to like a blog');
            return;
        }

        try {
            const response = await axios.post('/api/blogs/like/${id}', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const updatedLikes = response.data.likes;
            setLikeCount(updatedLikes);
            // setIsLiked(!isLiked); // Toggle the like state
            if(isLiked==false){
                setIsLiked((prev) => !prev);
                toast.success(response.data.message || 'Blog liked successfully');
            }
            else{
                setIsLiked((prev) => !prev);
            toast.success(response.data.message || 'Blog unliked successfully');
           }
        } catch (error) {
            console.error('Error liking the blog:', error);

            if (error.response) {
                switch (error.response.status) {
                    case 401:
                        toast.error('Please log in to like a blog');
                        break;
                    case 404:
                        toast.error('Blog not found');
                        break;
                    default:
                        toast.error('Failed to like the blog');
                }
            } else {
                toast.error('Network error. Please try again.');
            }
        }
    };

    return (
        <div className="flex items-center space-x-4 border-b border-gray-200 py-4">
            <div className="flex-shrink-0">
                <img
                    className="w-24 h-24 object-cover rounded-lg"
                    src={`http://localhost:5000${photo}`}
                    alt={title}
                />
            </div>
            <div className="flex-1">
                <div className="text-lg font-semibold text-gray-800">{title}</div>
                <div className="text-sm text-gray-600">
                    <span className="font-medium text-blue-500"># {category}</span>
                </div>
                <div className="text-sm text-gray-500">
                    {description?.slice(0, 100)}...
                </div>
                <div className="text-xs text-gray-400 flex justify-between items-center">
                    <span>{moment(createdAt).fromNow()}</span>
                    <span className="flex items-center">
                        <TbWriting className="mr-1" /> {author}
                    </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <Button
                        variant="outlined"
                        onClick={handleLike}
                        color="primary"
                        disabled={!localStorage.getItem('token')}
                        className="py-1 px-4 text-sm font-medium"
                    >
                        {isLiked ? <FcLike /> : <FcLikePlaceholder />}
                    </Button>

                    <Link
                        to={`/blog/${slug}`}
                        className="text-blue-500 text-sm font-medium hover:underline"
                    >
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
