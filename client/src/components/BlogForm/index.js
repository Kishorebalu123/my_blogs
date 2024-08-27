import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie'
import Header from "../Header"
import Footer from '../Footer'
import './index.css';

const BlogForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    

    useEffect(() => {
        if (id) {
            // Fetch the existing blog data for editing
            const fetchBlog = async () => {
         
                try {
                    const jwtToken=Cookies.get('jwt_token')
                    const response = await fetch(`https://my-blogs-00jp.onrender.com/posts/${id}`,{
                        method:'GET',
                        headers:{
            
                           Authorization: `Bearer ${jwtToken}`
                        }
                    });
              
                    if (!response.ok) {
                        throw new Error('Blog not found');
                    }
                    const data = await response.json();
                    setTitle(data.title || '');
                    setExcerpt(data.excerpt || '');
                    setContent(data.content || '');
                } catch (error) {
                    setError(error.message);
                }
            };
            fetchBlog();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const jwtToken=Cookies.get('jwt_token')
     
        const blogData = {
            title: title || undefined,
            excerpt: excerpt || undefined,
            content: content || undefined,
        };

        try {
            const method = id ? 'PUT' : 'POST';
            const url = id ? `https://my-blogs-00jp.onrender.com/posts/${id}` : 'https://my-blogs-00jp.onrender.com/posts';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                  Authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(blogData),
            });
            if (!response.ok) {
                throw new Error('Failed to save blog');
            }
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
        <Header/>
        <div className="blog-form">
            <h2>{id ? 'Edit Blog' : 'Create Blog'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Excerpt:
                    <input
                        type="text"
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Content:
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </label>
                <button type="submit">{id ? 'Update Blog' : 'Create Blog'}</button>
            </form>
        </div>
    <Footer/>
        </>
    );
};

export default BlogForm;
