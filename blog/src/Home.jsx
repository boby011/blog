import React from 'react';
import { Link } from 'react-router-dom';
import './Blog.css'; 

export const Home = () => {
  return (
    <div className="home-container">
      <div className='ite'>
        <h1 className='headingStyle'>Create your own blog easily.</h1>
        <Link to='/Sigin'><button className='home-btn'>Register</button></Link>
      </div>
    </div>
  );
};



