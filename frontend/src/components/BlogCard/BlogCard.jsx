import React, { useState } from 'react';
import moment from 'moment';
import { TbWriting } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const BlogCard = ({ id, title, slug, description, category, createdAt, author = "Rohit Bhardwaj", likes = 0, photo }) => {
    const [likeCount, setLikeCount] = useState(likes);

    const handleLike = async () => {
        try {
            const response = await axios.post(`${apiUrl}/api/blogs/like/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setLikeCount(response.data.likes);
        } catch (error) {
            console.error('Error liking the blog:', error);
        }
    };

    return (
        <div className="flex items-center space-x-4 border-b border-gray-200 py-4">
            <div className="flex-shrink-0">
                <img
                    className="w-24 h-24 object-cover rounded-lg"
                    src={`${apiUrl}${photo}`}
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
                        className="py-1 px-4 text-sm font-medium"
                    >
                        👍 {likeCount}
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
