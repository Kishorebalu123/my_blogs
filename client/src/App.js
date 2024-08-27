import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
//import SearchBar from './components/SearchBar';

import './App.css'

const App = () => {
    return (
        <Router>
                    <Routes>
                        <Route path="/register" element={<RegisterForm/>} />
                        <Route path="/login" element={<LoginForm/>} />
                        <Route exact path="/" element={<BlogList/>} />
                        <Route path="/blogs/:id" element={<BlogDetail/>} />
                        <Route path="/create" element={<BlogForm/>} />
                       <Route path="/edit/:id" element={<BlogForm/>} />
                    </Routes>
                
               
        
        </Router>
    );
};

export default App;
