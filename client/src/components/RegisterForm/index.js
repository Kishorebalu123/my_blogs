import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './index.css'

const RegisterForm = () => {
 const navigate=useNavigate()
 const [showErrMsg,setShowErrMsg]=useState(false)
  const [msg,setMsg]=useState('')
 const [form, setForm] = useState({
   username: '',
   password: '',
 });

 const handleChange = (e) => {
   const { name, value } = e.target;
   setForm({
     ...form,
     [name]: value,
   });
 };


 const submitSuccess = succMsg => {
  setShowErrMsg(true)
  setMsg(succMsg)
   navigate('/login',{replace:true})
 }

 const submitFailure =  msg => {
   setShowErrMsg(true)
   setMsg(msg)
   console.log(msg)

 
 }


 const handleSubmit = async(e) => {
   e.preventDefault();
   try {
   const {username,password}=form
   const url=' https://my-blogs-4dzo.onrender.com/auth/register'
   const options={
       method: 'POST',
       headers: {
         'Content-Type': 'application/json'
     },
       body: JSON.stringify({ username, password }),
   }

  const response = await fetch(url,options);
  const data=await response.json()
     if (response.ok) {
      submitSuccess(data.message)
   } else {
     submitFailure(data.msg)
      
   }
     

   } catch (error) {
   //  console.error('Error signing up:', error);
   }

 };

 return (
   <div className="signup-container">
     <h2>Register Form</h2>
     <form className="signup-form" onSubmit={handleSubmit}>
       <div className="form-group">
         <label htmlFor="username">Username</label>
         <input
           type="text"
           id="username"
           name="username"
           value={form.username}
           onChange={handleChange}
           required
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Password</label>
         <input
           type="password"
           id="password"
           name="password"
           value={form.password}
           onChange={handleChange}
           required
         />
       </div>
       <button type="submit" className="signup-button">Register</button>
       {showErrMsg&&<p className='error-msg'>{msg}</p>}
     </form>
   </div>
 );
};

export default RegisterForm;

