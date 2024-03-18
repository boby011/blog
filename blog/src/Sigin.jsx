import React, { useState } from 'react';
import './Blog.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export const Sigin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: '',
    secondname: '',
    username: '',
    password: '',
    email: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/insert', formData);

      if (response.data.emailExists) {
        toast.error('Email exists')
      } else {
        alert('Registration successful');
        setFormData('')
        navigate('/Login');
      }
    } catch (error) {
      toast.error('Registration failed.');
    }
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h1 className="sign-up-title">Register</h1>
        <div className='form-grp'>
          <div className='input-group'>
            <label>First Name:</label>
            <input
              type='text'
              name='firstname'
              placeholder='First Name'
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className='input-group'>
            <label>Second Name:</label>
            <input
              type='text'
              name='secondname'
              placeholder='Second Name'
              value={formData.secondname}
              onChange={handleChange}
            />
          </div>
          <div className='input-group'>
            <label>Username:</label>
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className='input-group'>
            <label>Password:</label>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className='input-group'>
            <label>Email:</label>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="sign-up-btn">Sign Up</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Sigin;
