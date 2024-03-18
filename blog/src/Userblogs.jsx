

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import './Blog.css';

export const Userblogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Get the id parameter from the URL

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/userblogs/${id}`, {
          headers: {
            Authorization: token
          }
        });
        setUserBlogs(response.data);
      } catch (error) {
        console.error('Error fetching user blogs:', error);
      }
    };
  
    fetchUserBlogs();
  }, [id]); // Include id in the dependency array

  return (
    <div className="user-blogs-container">
      <h2>Your Blogs</h2>
      {userBlogs.map(blog => (
        <Card key={blog._id} onClick={() => navigate(`/blogdetails/${blog._id}`)} className="blog-card">
          <Card.Body>
          <Card.Img variant="top" src={`http://localhost:5000/uploads/${blog.image}`} alt="blog" width={'200px'} height={'200px'} />
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>{blog.content}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};