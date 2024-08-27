import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';
import Cookies from "js-cookie"
const Header = () => {
    const navigate = useNavigate();
   

    const handleLogout = () => {
    
        Cookies.remove('jwt_token')
       
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">MyBlogs</Link>
            </div>
            <nav className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/create">Create Blog</Link>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </nav>
        </header>
    );
};

export default Header;
