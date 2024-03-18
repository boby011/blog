import React, { useState } from 'react';
import './Blog.css'; // Assuming this is the CSS file containing styles for login page
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
export const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await axios.post('http://localhost:5000/Login', data);
      if (response.data.token) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('id', response.data.user._id);
        toast.success('Login successful');
        navigate('/create');
      } else {
        toast.error('Invalid email or password');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message); // Display server-side error message
      } else {
        toast.error('Network error'); // Display generic network error
      }
    }
  };
  


  return (
    <>
      
      <div className='login-container'>
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">Login</h2>
          <div className="input-group">
            <input type="email" className='form-control' onChange={handleChange} name="email" placeholder='Email' />
          </div>
          <div className="input-group">
            <input type="password" className='form-control' onChange={handleChange} name="password" placeholder='Password' />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;



