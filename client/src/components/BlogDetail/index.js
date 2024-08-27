import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import CommentSection from '../CommentSection';
import Header from "../Header"
import Footer from '../Footer'
import './index.css';

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState('');
    const jwtToken=Cookies.get('jwt_token')
   // console.log(id)
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`http://localhost:5000/posts/${id}`,{
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                    },
                });
                
              
                if (!response.ok) {
                    throw new Error('Blog not found');
                }
                const data = await response.json();
                setBlog(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchBlog();
    }, [id,jwtToken]);

    const handleDelete = async () => {
        try {
            const response =await fetch(`http://localhost:5000/posts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            console.log(response)
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <>
      <Header/>
                
               <div className="blog-detail">
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                    <div className="blog-actions">
                        <button onClick={() => navigate(`/edit/${blog._id}`)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                    <CommentSection blogId={blog._id} />
                </div>

        <Footer/>
        </>
    );
};

export default BlogDetail;
