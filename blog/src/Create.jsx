import React from 'react';
import './Blog.css'; 
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';



export const Create = () => {
  const [data, setData] = useState({
    title: '',
    content: ''
  });
  const [image, setImage] = useState('');

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted'); // Check if form submission is triggered

    try {
      const userId = localStorage.getItem('id');
      console.log(userId);
      const postData = {
        ...data,
        user: userId
      };

      const formData = new FormData();

      formData.append('title', postData.title);
      formData.append('content', postData.content);
      formData.append('image', image);
      formData.append('user', userId);

      let response = await axios.post(
        'http://localhost:5000/addblog',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      console.log('Response:', response.data); // Check response from backend
      if (response.data) {
        toast.success('Blog Posted Successfully');
        setData({
          title: '',
          content: ''
        });
        setImage('');
      }
    } catch (error) {
      console.error('Error adding blog post:', error);
      toast.error('Failed to post blog');
    }
  };

  return (
    <div className="create-container">
      <h1 className="login-title">Create Your Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="cinput-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={data.title}
            onChange={handleChange}
          />
        </div>
        <div className="cinput-group">
          <label>Content:</label>
          <textarea className='carea'
            name="content"
            rows={10}
            cols={50}
            value={data.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            style={{ padding: '0px' }}
          />
        </div>
        <div>
          <button className='cbutton' type="submit">Submit</button> {/* Change button type to 'submit' */}
        </div>
      </form>
    </div>
  );
};
