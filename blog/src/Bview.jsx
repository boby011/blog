import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import './Blog.css'; 

export const Bview = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      let response = await axios.get('http://localhost:5000/blogs');
      console.log(response.data);
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  return (
    <section style={{ marginTop: '150px' }} className='d-flex justify-content-center'>
      <div className='blogs'>
        {blogs.length > 0 ? (
          blogs.map(item => (
            <div key={item._id} className='card-container'>
              <Card className='card' onClick={() => { navigate(`/blogdetails/${item._id}`) }}>
              <Card.Img variant="top" src={`http://localhost:5000/uploads/${item.image}`} alt="blog" width={'200px'} height={'200px'} />


                <Card.Body className="blog-details">
                  <Card.Title className='card-title'>
                    <h2>{item.title}</h2>
                  </Card.Title>
                  <Card.Text className='card-content'>
                    <div>{item.content}</div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div style={{ fontSize: '28px', color: 'gainsboro', fontWeight: 'bold' }}>No Blogs Found</div>
        )}
      </div>
    </section>
  );
}

