
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import './Blog.css';

export const User = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    image: null
  });

  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/findOne/${id}`, {
          headers: {
            Authorization: token
          }
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        toast.error('Failed to fetch user data. Please try again later.');
      }
    };
  
    fetchData();
  }, [id, token]);

  const handleChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setUserData({ ...userData, image: event.target.files[0] });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
  
    try {
      await axios.put(`http://localhost:5000/update/${id}`, formData, {
        headers: { Authorization: token, 'Content-Type': 'multipart/form-data' }
      });
  
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again later.');
    }
  };
  
  return (
    <>
      <section className='profile-container'>
        <div className='profile'>
          <div className='editpro'>
            <form onSubmit={handleUpdate}>
              <h1>{userData.username}</h1>
              <Link to={`/userblogs/${id}`}><button>Your Blogs</button></Link>
              <div className="proform-group">
                <label htmlFor="username">User Name</label>
                <input type="text" id="username" name="username" onChange={handleChange} value={userData.username} placeholder='Username' />
              </div>
              <div className="proform-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" onChange={handleChange} value={userData.email} placeholder='Email' />
              </div>
              <div className="proform-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" onChange={handleChange} placeholder="Change Password" />
              </div>
              <div className="proform-group">
                <label htmlFor="image">Add Profile Photo</label>
                <input type="file" name="image" id="image" onChange={handleImageChange} />
              </div>
              <button className='probutton' type="submit">Update Profile</button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};
