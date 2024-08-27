import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css';

const jwtToken=Cookies.get('jwt_token')


const BlogList = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate=useNavigate()

    useEffect(()=>{

        if (jwtToken === undefined) {
          navigate('/login',{replace:true})
        }  
      
      })

    useEffect(() => {
        const fetchBlogs = async () => {
           

            const response = await fetch(`http://localhost:5000/posts`,{
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            const data = await response.json();
            setBlogs(data);
        };
        fetchBlogs();
    }, []);

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
