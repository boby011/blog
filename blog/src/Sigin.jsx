import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Sigin = () => {
  const [formData, setFormData] = useState({
    blogtitle: '',
    firstname: '',
    secondname: '',
    username: '',
    password: '',
    email: '',
  });

  const handleChange = (event) => {
    // const { name, value } = event.target;
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('ku');
      // Send registration data to the backend
        const response = await axios.post('http://localhost:5000/insert', formData);
        console.log(response,'sdfd');

        if (response.data.emailExists) {
          toast.error('Email exists')
        } else {
          // Display success message
          alert('Registration successful');

          // Clear form data
          // setFormData({
          //   blogtitle: '',
          //   firstname: '',
          //   secondname: '',
          //   username: '',
          //   password: '',
          //   email: '',
          // });
        }
        
      
    } catch (error) {
      // Display error message if registration fails
      toast.error('Registration failed.');
    }
  };
console.log(formData,'form data');
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Register</h1>
        <div className='form-grp'>
          <div className='input-group'>
            <label>Blog Title:</label>
            <input
              type='text'
              name='blogtitle'
              placeholder='Blog Title'
              value={formData.blogtitle}
              onChange={handleChange}
            />
          </div>
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
          <button type="submit" className="login-btn">Sign Up</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

