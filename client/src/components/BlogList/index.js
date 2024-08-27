import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css';




const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate=useNavigate()
    const jwtToken=Cookies.get('jwt_token')

    useEffect(()=>{

        if (jwtToken === undefined) {
          navigate('/login',{replace:true})
        }  
      
      },[jwtToken,navigate])

    useEffect(() => {
        const fetchBlogs = async () => {
           
           
            const response = await fetch(` https://my-blogs-4dzo.onrender.com/posts`,{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            const data = await response.json();
            setBlogs(data);
        };
        if (jwtToken) { 
            fetchBlogs();
        }
    }, [jwtToken]);


    return (
        <>
        <Header/>
           <div className="blog-list">
            {blogs.map(blog => (
                <div key={blog._id} className="blog-item">
                    <h2>{blog.title}</h2>
                    <p>{blog.excerpt}</p>
                    <Link to={`/blogs/${blog._id}`}>Read More</Link>
                </div>
            ))}
        </div>
        <Footer/>
        </>
     
    );
};

export default BlogList;
